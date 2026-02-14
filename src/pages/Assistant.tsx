import React from 'react';
import { Sparkles, ArrowUpRight, MessageCircle } from 'lucide-react';

const AIAssistantCenter = () => {
  const tasks = [
    { id: 1, title: 'Boost Conversion', desc: "Your 'Abstract Blue' piece is getting high traffic but low sales. Want me to draft a limited-time 15% discount for it?", action: 'Draft Discount' },
    { id: 2, title: 'Content Strategy', desc: "It's been 3 days since your last update. I've prepared a 'Behind the Scenes' post draft for your storefront.", action: 'Review Post' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Creator.</h1>
        <p className="text-slate-500">I've analyzed your shop activity. Here's your game plan for today.</p>
      </header>

      <div className="grid gap-6 mb-12">
        {tasks.map(task => (
          <div key={task.id} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-1">
                <Sparkles size={16} />
                <span>{task.title}</span>
              </div>
              <p className="text-slate-600">{task.desc}</p>
            </div>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-600 transition-colors">
              {task.action}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Need a new campaign?</h2>
          <p className="text-indigo-100">Just describe your vibe, and I'll build the pages and copy.</p>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          <MessageCircle size={20} />
          Talk to Assistant
        </button>
      </div>
    </div>
  );
};

export default AIAssistantCenter;
