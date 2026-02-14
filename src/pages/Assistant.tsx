import React from 'react';

const AIAssistantCenter = () => {
  // Mock data for the assistant's "thoughts"
  const suggestions = [
    { id: 1, type: 'action', text: "Your 'Sunset Series' is getting clicks from TikTok. I've drafted a limited-time 10% discount code to close more sales. Want to activate it?", label: 'Activate Discount' },
    { id: 2, type: 'insight', text: "Most of your fans are active around 6 PM EST. I can schedule your next product drop for then.", label: 'Schedule Drop' },
    { id: 3, type: 'draft', text: "I noticed you haven't replied to a message about a custom commission. Here's a draft response based on your previous pricing...", label: 'Review Draft' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Good morning, Artist.</h1>
        <p className="text-gray-500 text-lg">I've been keeping an eye on your empire while you were away. Here’s what we should focus on today:</p>
      </header>

      <div className="grid gap-6">
        {suggestions.map((item) => (
          <div key={item.id} className="bg-white border-2 border-indigo-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between">
            <div className="flex-1 pr-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                item.type === 'action' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {item.type.toUpperCase()}
              </span>
              <p className="text-gray-800 text-lg leading-relaxed">{item.text}</p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
              {item.label}
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold italic">R</div>
          <input 
            type="text" 
            placeholder="Ask me to do something (e.g., 'Draft a newsletter for my top 50 fans')" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-indigo-900 placeholder-indigo-400 text-lg"
          />
        </div>
      </footer>
    </div>
  );
};

export default AIAssistantCenter;
