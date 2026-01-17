
import React from 'react';
import { RATES } from '../constants';
import Icon from './Icon';

interface RatesProps {
  onBookClick?: () => void;
}

const Rates: React.FC<RatesProps> = ({ onBookClick }) => {
  return (
    <section id="rates" className="py-24 bg-stone-900 text-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Transparent Pricing</h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            No hidden fees. Just great sites and friendly West Texas service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RATES.map((rate, idx) => (
            <div
              key={idx}
              className={`relative bg-stone-800 p-8 rounded-3xl border transition-all hover:translate-y-[-8px] ${
                rate.featured ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 z-10' : 'border-stone-700'
              }`}
            >
              {rate.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{rate.period}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-emerald-400">{rate.price}</span>
                <span className="text-stone-400 ml-2">/ stay</span>
              </div>
              <ul className="space-y-4 mb-8">
                {rate.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
                    <Icon name="Check" className="text-emerald-500" size={16} />
                    {detail}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onBookClick}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  rate.featured 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-stone-700 hover:bg-stone-600 text-white'
                }`}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center text-stone-500 italic text-sm">
          *Monthly rates do not include electricity which is metered and billed separately at our current rate.
        </div>
      </div>
    </section>
  );
};

export default Rates;
