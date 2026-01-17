
import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Icon name="Mountain" className="text-emerald-500" size={28} />
            <span className="text-xl font-bold text-white tracking-tight">
              Mountain View <span className="text-emerald-500">RV</span>
            </span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Twitter</a>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Mountain View RV Park. All rights reserved.</p>
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
