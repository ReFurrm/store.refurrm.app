import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';

const MarketplaceLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link to="/" className="font-bold text-2xl italic text-indigo-600">ReFurrm</Link>
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search artists, styles, or specific pieces..." 
            className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to="/studio" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Artist Login</Link>
          <button className="p-2 text-slate-600"><ShoppingBag size={24} /></button>
        </div>
      </div>
    </nav>
    <main><Outlet /></main>
  </div>
);

export default MarketplaceLayout;
