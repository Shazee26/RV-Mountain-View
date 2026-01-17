
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Rates from './components/Rates';
import GeminiAssistant from './components/GeminiAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Icon from './components/Icon';

type TabType = 'amenities' | 'gallery' | 'rates' | 'assistant' | 'contact';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('amenities');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const tabs = [
    { id: 'amenities', label: 'Amenities', icon: 'Sparkles' },
    { id: 'gallery', label: 'Gallery', icon: 'Camera' },
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

  const openBooking = () => setIsBookingOpen(true);

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
            <div className="flex justify-center space-x-2 md:space-x-8">
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
          {activeTab === 'gallery' && <Gallery />}
          {activeTab === 'rates' && <Rates onBookClick={openBooking} />}
          {activeTab === 'assistant' && <GeminiAssistant />}
          {activeTab === 'contact' && <Contact />}
        </div>

        {/* Call to action floating button (Mobile) */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <button 
            onClick={openBooking}
            className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
          >
            <Icon name="CalendarCheck" size={24} />
          </button>
        </div>
      </main>
      
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

export default App;
