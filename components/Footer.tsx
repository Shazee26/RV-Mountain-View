
import React from 'react';
import Icon from './Icon';
import { PARK_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Icon name="Mountain" className="text-emerald-500" size={28} />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight leading-none">
                Mountain View <span className="text-emerald-500">RV</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Van Horn, TX</span>
            </div>
          </div>
          
          <div className="flex gap-8">
            <a 
              href={PARK_INFO.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-stone-900 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
              aria-label="Facebook"
            >
              <Icon name="Facebook" size={20} />
            </a>
            <a 
              href={PARK_INFO.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-stone-900 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
              aria-label="Instagram"
            >
              <Icon name="Instagram" size={20} />
            </a>
            <a 
              href={PARK_INFO.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-stone-900 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
              aria-label="Twitter"
            >
              <Icon name="Twitter" size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© {new Date().getFullYear()} Mountain View RV Park. All rights reserved.</p>
            <span className="hidden md:block text-stone-700">•</span>
            <p className="text-stone-500 italic">Gate to the Guadalupe Mountains</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
