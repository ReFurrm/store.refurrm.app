import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AdminRoute } from '@/components/AdminRoute';

import './App.css';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Storefront = lazy(() => import('@/pages/Storefront'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Success = lazy(() => import('@/pages/Success'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Products = lazy(() => import('@/pages/Products'));
const ProductForm = lazy(() => import('@/pages/ProductForm'));
const Subscriptions = lazy(() => import('@/pages/Subscriptions'));
const PremiumContent = lazy(() => import('@/pages/PremiumContent'));
const Bookings = lazy(() => import('@/pages/Bookings'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const DMCampaigns = lazy(() => import('@/pages/DMCampaigns'));
const Emails = lazy(() => import('@/pages/Emails'));
const Integrations = lazy(() => import('@/pages/Integrations'));
const Settings = lazy(() => import('@/pages/Settings'));
const Billing = lazy(() => import('@/pages/Billing'));
const Dunning = lazy(() => import('@/pages/Dunning'));
const SupportAdmin = lazy(() => import('@/pages/SupportAdmin'));
const VIPManager = lazy(() => import('@/pages/VIPManager'));
const Affiliates = lazy(() => import('@/pages/Affiliates'));
const AffiliateDashboard = lazy(() => import('@/pages/AffiliateDashboard'));
const EmailTemplates = lazy(() => import('@/pages/EmailTemplates'));
const ReviewsManager = lazy(() => import('@/pages/ReviewsManager'));
const ReviewsAnalytics = lazy(() => import('@/pages/ReviewsAnalytics'));
const EmailCampaigns = lazy(() => import('@/pages/EmailCampaigns'));
const SocialMediaAnalytics = lazy(() => import('@/pages/SocialMediaAnalytics'));
const Community = lazy(() => import('@/pages/Community'));
const Marketplace = lazy(() => import('@/pages/Marketplace'));
const Admin = lazy(() => import('@/pages/Admin'));
const BlogAdmin = lazy(() => import('@/pages/BlogAdmin'));
const OnboardingAnalytics = lazy(() => import('@/pages/OnboardingAnalytics'));
const CustomerSupport = lazy(() => import('@/pages/CustomerSupport'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/shop/:username" element={<Storefront />} />
                <Route path="/checkout/:productId" element={<Checkout />} />
                <Route path="/success" element={<Success />} />

                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/:id/edit"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/storefront"
                  element={
                    <ProtectedRoute>
                      <Storefront />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscriptions"
                  element={
                    <ProtectedRoute>
                      <Subscriptions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/premium"
                  element={
                    <ProtectedRoute>
                      <PremiumContent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dm-campaigns"
                  element={
                    <ProtectedRoute>
                      <DMCampaigns />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/emails"
                  element={
                    <ProtectedRoute>
                      <Emails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/integrations"
                  element={
                    <ProtectedRoute>
                      <Integrations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dunning"
                  element={
                    <ProtectedRoute>
                      <Dunning />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/support-admin"
                  element={
                    <ProtectedRoute>
                      <SupportAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vip-manager"
                  element={
                    <ProtectedRoute>
                      <VIPManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/affiliates"
                  element={
                    <ProtectedRoute>
                      <Affiliates />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/affiliate-dashboard"
                  element={
                    <ProtectedRoute>
                      <AffiliateDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-templates"
                  element={
                    <ProtectedRoute>
                      <EmailTemplates />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reviews-manager"
                  element={
                    <ProtectedRoute>
                      <ReviewsManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reviews-analytics"
                  element={
                    <ProtectedRoute>
                      <ReviewsAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-campaigns"
                  element={
                    <ProtectedRoute>
                      <EmailCampaigns />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/social-analytics"
                  element={
                    <ProtectedRoute>
                      <SocialMediaAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/blog/admin"
                  element={
                    <AdminRoute>
                      <BlogAdmin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/onboarding-analytics"
                  element={
                    <AdminRoute>
                      <OnboardingAnalytics />
                    </AdminRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <CustomerSupport />
              <Toaster />
            </Suspense>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
