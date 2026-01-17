
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';
import Icon from './Icon';
import { supabase } from '../services/supabase';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch images from Supabase
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Merge initial hardcoded images with database images
      setImages([...GALLERY_IMAGES, ...(data || [])]);
    } catch (err) {
      console.error('Error fetching images:', err);
      setImages(GALLERY_IMAGES);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const categories = useMemo(() => {
    const cats = new Set(images.map(img => img.category));
    return ['All', ...Array.from(cats)];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter(img => img.category === filter);
  }, [images, filter]);

  const processFile = async (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      setToast({ message: "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.", type: 'error' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Save Record to Database
      const newImageRecord = {
        url: publicUrl,
        title: file.name.split('.')[0] || "New Memory",
        category: 'Park',
        description: uploadDescription.trim() || "A beautiful moment at Mountain View RV Park."
      };

      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([newImageRecord]);

      if (dbError) throw dbError;

      setToast({ message: "Image uploaded successfully!", type: 'success' });
      setUploadDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh list
      fetchImages();
    } catch (err: any) {
      console.error('Upload error:', err);
      setToast({ message: err.message || "Failed to upload image.", type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
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

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
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

        {/* Drag & Drop Zone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative mb-12 p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-50 scale-[1.01]' 
              : 'border-stone-200 bg-white'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? 'bg-emerald-200 text-emerald-700' : 'bg-stone-100 text-stone-400'}`}>
            <Icon name={isUploading ? "Loader2" : (isDragging ? "Download" : "UploadCloud")} size={48} className={isUploading ? 'animate-spin' : ''} />
          </div>
          
          <div className="max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-stone-800">
              {isUploading ? "Processing..." : (isDragging ? "Drop to upload image" : "Upload your park memories")}
            </h3>
            <p className="text-stone-500 text-sm">
              Drag and drop your photos here, or use the controls below to select a file.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <input 
                type="text" 
                placeholder="Add a description (optional)..."
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <label className="cursor-pointer flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-md whitespace-nowrap">
                <Icon name="Plus" size={18} />
                <span>Select File</span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/jpeg,image/png,image/gif,image/webp" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>
          </div>

          {/* Toast Notification */}
          {toast && (
            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300 z-50 ${
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-800 text-white'
            }`}>
              <Icon name={toast.type === 'error' ? 'AlertCircle' : 'CheckCircle'} size={20} />
              <span className="text-sm font-bold whitespace-nowrap">{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
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
                className="w-full object-cover transition-all duration-500 group-hover:brightness-[0.3]" 
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent text-left">
                <span className="text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white font-bold text-lg md:text-xl truncate">{img.title}</h4>
                <p className="text-stone-300 text-xs md:text-sm line-clamp-2 mt-1 mb-4">
                  {img.description || "View Details"}
                </p>
                <div className="flex items-center text-emerald-400 text-xs font-bold gap-2">
                  <span>View Full Details</span>
                  <Icon name="Maximize" size={14} />
                </div>
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
            className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors z-10 p-2"
            onClick={() => setSelectedImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          
          <div 
            className="relative max-w-5xl w-full flex flex-col items-center justify-center gap-6"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center text-white space-y-2 max-w-2xl px-4">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{selectedImage.category}</span>
              <h3 className="text-2xl md:text-4xl font-bold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-stone-300 text-sm md:text-lg leading-relaxed mt-2 italic font-light">
                  "{selectedImage.description}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
