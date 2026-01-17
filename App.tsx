
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Amenities from './components/Amenities';
import Rates from './components/Rates';
import GeminiAssistant from './components/GeminiAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Icon from './components/Icon';

type TabType = 'amenities' | 'rates' | 'assistant' | 'contact';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('amenities');

  const tabs = [
    { id: 'amenities', label: 'Amenities', icon: 'Sparkles' },
    { id: 'rates', label: 'Rates', icon: 'DollarSign' },
    { id: 'assistant', label: 'AI Planner', icon: 'Bot' },
    { id: 'contact', label: 'Contact', icon: 'MapPin' },
  ];

  const handleExplore = () => {
    const element = document.getElementById('tab-navigation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onTabSelect={(tab) => {
        setActiveTab(tab as TabType);
        handleExplore();
      }} />
      
      <main>
        {/* Always visible Hero */}
        <Hero onExplore={handleExplore} />

        {/* Tab Navigation Section */}
        <section id="tab-navigation" className="sticky top-[72px] z-40 bg-white border-b border-stone-200 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 py-6 px-4 font-bold transition-all border-b-4 ${
                    activeTab === tab.id 
                    ? 'border-emerald-600 text-emerald-600' 
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'amenities' && <Amenities />}
          {activeTab === 'rates' && <Rates />}
          {activeTab === 'assistant' && <GeminiAssistant />}
          {activeTab === 'contact' && <Contact />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
