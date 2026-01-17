
import React from 'react';
import { GALLERY_IMAGES } from '../constants';
import Icon from './Icon';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-stone-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-4 uppercase tracking-tight">Image Gallery</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Discover the raw beauty of West Texas and the pristine comfort of our sites.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg transition-transform hover:scale-[1.02]">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full object-cover transition-all duration-500 group-hover:brightness-50" 
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white font-bold text-xl">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-stone-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2">Want to see it for yourself?</h3>
            <p className="text-stone-400 max-w-md">Our sites fill up fast during the peak desert season. Secure your mountain view today.</p>
          </div>
          <button className="relative z-10 bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
            Book Site Now
          </button>
          {/* Decorative Circle */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
