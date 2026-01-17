
import React from 'react';
import Icon from './Icon';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - West Texas / Mountains style */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1502472992487-44c77d7bb9ec?auto=format&fit=crop&q=80&w=2000"
          alt="West Texas Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-7xl text-white font-bold mb-6 leading-tight">
          Gateway to the West Texas <span className="text-emerald-400">Mountains</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto">
          Experience the majestic views of Van Horn's premier RV destination. Your perfect base for exploring the high desert.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="Map" size={20} />
            Explore Park Tabs
          </button>
          <a
            href="tel:+14322830123"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="Phone" size={20} />
            Call to Book
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" className="text-white opacity-60" size={32} />
      </div>
    </section>
  );
};

export default Hero;
