
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface NavbarProps {
  onTabSelect: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTabSelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Amenities', id: 'amenities' },
    { name: 'Rates', id: 'rates' },
    { name: 'Assistant', id: 'assistant' },
    { name: 'Location', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Icon name="Mountain" className={`${isScrolled ? 'text-emerald-700' : 'text-white'}`} size={32} />
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
                Mountain View <span className="text-emerald-500">RV</span>
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-widest ${isScrolled ? 'text-stone-500' : 'text-stone-300'}`}>
                Van Horn, TX
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onTabSelect(link.id)}
                className={`font-semibold transition-colors hover:text-emerald-500 text-sm uppercase tracking-wider ${isScrolled ? 'text-stone-600' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-stone-900' : 'text-white'}`}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full p-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onTabSelect(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-stone-700 font-bold py-3 border-b border-stone-100 uppercase tracking-widest text-sm"
            >
              {link.name}
            </button>
          ))}
          <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
