
import React, { useState, useEffect, useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';
import Icon from './Icon';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Load images from constants + localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mountainview_gallery_uploads');
    const uploadedImages = saved ? JSON.parse(saved) : [];
    setImages([...GALLERY_IMAGES, ...uploadedImages]);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(images.map(img => img.category));
    return ['All', ...Array.from(cats)];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter(img => img.category === filter);
  }, [images, filter]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage: GalleryImage = {
        url: reader.result as string,
        title: file.name.split('.')[0] || "New Memory",
        category: 'Park' // Default category for uploads
      };

      const updatedImages = [...images, newImage];
      setImages(updatedImages);

      // Persist only the uploads to localStorage
      const saved = localStorage.getItem('mountainview_gallery_uploads');
      const currentUploads = saved ? JSON.parse(saved) : [];
      localStorage.setItem('mountainview_gallery_uploads', JSON.stringify([...currentUploads, newImage]));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="gallery" className="py-12 md:py-24 bg-stone-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 uppercase tracking-tight">Image Gallery</h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover the raw beauty of West Texas and the pristine comfort of our sites.
          </p>
        </div>

        {/* Controls: Filter & Upload */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="cursor-pointer flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-200 transition-all border border-emerald-200 shadow-sm">
            <Icon name="Upload" size={18} />
            <span>Upload Memory</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(img)}
              className="relative group overflow-hidden rounded-2xl md:rounded-3xl break-inside-avoid shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                loading="lazy"
                className="w-full object-cover transition-all duration-500 group-hover:brightness-50" 
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white font-bold text-lg md:text-xl truncate">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
            <Icon name="Image" size={48} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500 font-medium">No images found in this category.</p>
          </div>
        )}

        <div className="mt-16 bg-stone-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between text-white overflow-hidden relative">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Want to see it for yourself?</h3>
            <p className="text-stone-400 max-w-md mx-auto md:mx-0">Our sites fill up fast during the peak desert season. Secure your mountain view today.</p>
          </div>
          <button className="relative z-10 w-full md:w-auto bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
            Book Site Now
          </button>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md"></div>
          <button 
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          
          <div 
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center text-white space-y-1">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{selectedImage.category}</span>
              <h3 className="text-2xl md:text-3xl font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
