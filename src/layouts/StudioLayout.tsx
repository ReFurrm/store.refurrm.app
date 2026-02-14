import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Package, BarChart3, Settings, Sparkles } from 'lucide-react';

const StudioLayout = () => {
  const location = useLocation();

  const navItems = [
    { icon: <Sparkles size={20} />, label: 'AI Assistant', path: '/studio' },
    { icon: <BarChart3 size={20} />, label: 'Stats', path: '/studio/stats' },
    { icon: <Package size={20} />, label: 'Products', path: '/studio/products' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/studio/messages' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/studio/settings' },
  ];

  return (
    <div className="flex h-screen bg-white text-slate-900">
      {/* Persistent Sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold italic">R</div>
          <span className="font-bold text-xl tracking-tight">ReFurrm Studio</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
                location.pathname === item.path 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Assistant Status</p>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online & Learning
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/30">
        <Outlet />
      </main>
    </div>
  );
};

export default StudioLayout;
