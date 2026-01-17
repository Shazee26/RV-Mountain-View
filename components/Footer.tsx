
import React from 'react';
import Icon from './Icon';
import { PARK_INFO } from '../constants';

const Footer: React.FC = () => {
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      // Basic check: Ensure it's not a placeholder/example URL
      return !url.includes('example.com') && !url.includes('handle');
    } catch (e) {
      return false;
    }
  };

  const socialLinks = [
    { id: 'facebook', icon: 'Facebook', url: PARK_INFO.socials.facebook, label: 'Facebook' },
    { id: 'instagram', icon: 'Instagram', url: PARK_INFO.socials.instagram, label: 'Instagram' },
    { id: 'twitter', icon: 'Twitter', url: PARK_INFO.socials.twitter, label: 'Twitter' },
  ];

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
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4 md:gap-8">
              {socialLinks.map(link => {
                const valid = isValidUrl(link.url);
                return (
                  <div key={link.id} className="group relative">
                    <a 
                      href={valid ? link.url : '#'} 
                      target={valid ? "_blank" : "_self"}
                      rel="noopener noreferrer" 
                      className={`p-3 rounded-full transition-all flex items-center justify-center ${
                        valid 
                        ? 'bg-stone-900 hover:bg-emerald-600 hover:text-white' 
                        : 'bg-stone-900/50 text-stone-700 cursor-help'
                      }`}
                      aria-label={link.label}
                      onClick={(e) => !valid && e.preventDefault()}
                    >
                      <Icon name={link.icon} size={20} />
                    </a>
                    {!valid && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-red-900/90 text-red-100 text-[10px] font-bold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Admin: Link Required
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-stone-600 font-medium">Follow our journey through West Texas</p>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Mountain View RV Park. All rights reserved.</p>
            <span className="hidden md:block text-stone-700">•</span>
            <p className="text-stone-500 italic">Gate to the Guadalupe Mountains</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
