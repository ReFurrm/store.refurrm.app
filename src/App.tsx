import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layouts (You'll want to create these to handle shared Nav/Assistant UI)
const MarketplaceLayout = lazy(() => import('./layouts/MarketplaceLayout'));
const StorefrontLayout = lazy(() => import('./layouts/StorefrontLayout'));
const StudioLayout = lazy(() => import('./layouts/StudioLayout'));

// Pages
const MarketplaceFeed = lazy(() => import('./pages/Marketplace'));
const CreatorStorefront = lazy(() => import('./pages/Storefront'));
const DashboardOverview = lazy(() => import('./pages/Dashboard')); // Your current dashboard
const AIAssistantCenter = lazy(() => import('./pages/Assistant')); // The new "Home"

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          {/* 1. DISCOVERY: The "Facebook Marketplace" for Artists */}
          <Route path="/" element={<MarketplaceLayout />}>
            <Route index element={<MarketplaceFeed />} />
            <Route path="search" element={<div>Search Component</div>} />
          </Route>

          {/* 2. CONVERSION: Stan.Store Style Creator Pages */}
          {/* This dynamic route handles refurrm.app/yourname */}
          <Route path="/:username" element={<StorefrontLayout />}>
            <Route index element={<CreatorStorefront />} />
            <Route path="booking" element={<div>Booking Component</div>} />
            <Route path="checkout" element={<div>Simplified Checkout</div>} />
          </Route>

          {/* 3. MANAGEMENT: The "Studio" where the Assistant lives */}
          <Route path="/studio" element={<StudioLayout />}>
            {/* Make the Assistant the first thing they see after login */}
            <Route index element={<AIAssistantCenter />} /> 
            <Route path="stats" element={<DashboardOverview />} /> 
            <Route path="products" element={<div>Product Manager</div>} />
            <Route path="messages" element={<div>DM Manager</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
