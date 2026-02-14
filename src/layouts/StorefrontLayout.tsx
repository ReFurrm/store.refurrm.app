import React from 'react';
import { Outlet } from 'react-router-dom';

const StorefrontLayout = () => (
  <div className="min-h-screen bg-white">
    {/* Minimalist container for mobile-first link-in-bio feel */}
    <div className="max-w-md mx-auto min-h-screen shadow-2xl shadow-slate-200">
      <Outlet />
    </div>
  </div>
);

export default StorefrontLayout;
