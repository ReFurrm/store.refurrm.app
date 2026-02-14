import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock the supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

// Mock layout component that renders an Outlet for nested routes
const MockLayout = () => (
  <div>
    <div>Layout Content</div>
    <Outlet />
  </div>
);

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login when user is not authenticated', async () => {
    const { supabase } = await import('@/lib/supabase');
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('renders protected content when user is authenticated', async () => {
    const { supabase } = await import('@/lib/supabase');
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      role: 'authenticated',
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser, access_token: 'token', refresh_token: 'refresh' } as any },
      error: null,
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('blocks nested child routes when parent route is protected and user is not authenticated', async () => {
    const { supabase } = await import('@/lib/supabase');
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    // Try to access a nested child route /studio/stats
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/studio/stats']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/studio"
              element={
                <ProtectedRoute>
                  <MockLayout />
                </ProtectedRoute>
              }
            >
              <Route path="stats" element={<div>Stats Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Should redirect to login, not render the stats page
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Stats Page')).not.toBeInTheDocument();
      expect(screen.queryByText('Layout Content')).not.toBeInTheDocument();
    });
  });

  it('allows nested child routes when parent route is protected and user is authenticated', async () => {
    const { supabase } = await import('@/lib/supabase');
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      role: 'authenticated',
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser, access_token: 'token', refresh_token: 'refresh' } as any },
      error: null,
    });

    // Access a nested child route /studio/stats when authenticated
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/studio/stats']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/studio"
              element={
                <ProtectedRoute>
                  <MockLayout />
                </ProtectedRoute>
              }
            >
              <Route path="stats" element={<div>Stats Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Should render both layout and stats page when authenticated
    await waitFor(() => {
      expect(screen.getByText('Layout Content')).toBeInTheDocument();
      expect(screen.getByText('Stats Page')).toBeInTheDocument();
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });
  });
});
