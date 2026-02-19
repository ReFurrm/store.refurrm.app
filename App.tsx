import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layouts handle the persistent UI like the AI Assistant sidebar or navigation
const MarketplaceLayout = lazy(() => import('./layouts/MarketplaceLayout'));
const StorefrontLayout = lazy(() => import('./layouts/StorefrontLayout'));
const StudioLayout = lazy(() => import('./layouts/StudioLayout'));

// Pages
const MarketplaceFeed = lazy(() => import('./pages/Marketplace'));
const CreatorStorefront = lazy(() => import('./pages/Storefront'));
const DashboardOverview = lazy(() => import('./pages/Dashboard'));
const AIAssistantCenter = lazy(() => import('./pages/Assistant'));
const BookingPage = lazy(() => import('./pages/Bookings'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const ProductManager = lazy(() => import('./pages/Products'));
const DMManager = lazy(() => import('./pages/DMCampaigns'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          {/* 1. DISCOVERY: The Marketplace Feed */}
          <Route path="/" element={<MarketplaceLayout />}>
            <Route index element={<MarketplaceFeed />} />
            <Route path="search" element={<MarketplaceFeed />} />
          </Route>

          {/* 2. CONVERSION: Stan.Store Style Creator URLs (e.g., refurrm.app/username) */}
          <Route path="/:username" element={<StorefrontLayout />}>
            <Route index element={<CreatorStorefront />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

          {/* 3. MANAGEMENT: The "Studio" where the AI Assistant lives */}
          <Route path="/studio" element={<StudioLayout />}>
            {/* The Assistant is the new default view after logging in */}
            <Route index element={<AIAssistantCenter />} /> 
            <Route path="stats" element={<DashboardOverview />} /> 
            <Route path="products" element={<ProductManager />} />
            <Route path="messages" element={<DMManager />} />
          </Route>

          {/* Catch-all: Redirect back to discovery */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
