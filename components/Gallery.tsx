
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';
import Icon from './Icon';
import { supabase } from '../services/supabase';
import { GoogleGenAI, Type } from "@google/genai";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<GalleryImage>>({});
  
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<string>('Park');
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
      const timer = setTimeout(() => setToast(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const categories = useMemo(() => {
    const standardCategories = ['Park', 'Scenery', 'Facilities', 'General'];
    const dynamicCats = images.map(img => img.category);
    const combined = new Set(['All', ...standardCategories, ...dynamicCats]);
    return Array.from(combined);
  }, [images]);

  const filteredImages = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter(img => img.category === filter);
  }, [images, filter]);

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise as string, mimeType: file.type },
    };
  };

  const processFile = async (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setToast({ message: "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.", type: 'error' });
      return;
    }

    setIsUploading(true);
    setIsAnalyzing(true);
    setUploadProgress(0);

    let detectedCategory = 'Park';
    let suggestedTitle = file.name.split('.')[0].replace(/[_-]/g, ' ');
    let suggestedDescription = uploadDescription.trim();

    // AI Analysis
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const imagePart = await fileToGenerativePart(file);
      const prompt = `Analyze this image for a Mountain View RV Park website. Categorize and suggest metadata in JSON. Categories: Scenery, Park, Facilities, General.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [imagePart, { text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          }
        }
      });
      
      const aiData = JSON.parse(response.text || '{}');
      if (aiData.category) detectedCategory = aiData.category;
      if (aiData.title) suggestedTitle = aiData.title;
      if (aiData.description) suggestedDescription = aiData.description;
    } catch (e) {
      console.warn("AI Analysis skipped:", e);
    } finally {
      setIsAnalyzing(false);
    }

    // STORAGE UPLOAD WITH CASE-SENSITIVITY RETRY
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Try 'gallery' first
      let activeBucket = 'gallery';
      let { error: uploadError } = await supabase.storage
        .from(activeBucket)
        .upload(filePath, file, {
          onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded / p.total) * 100))
        });

      // If 'gallery' fails with Not Found, try 'Gallery'
      if (uploadError?.message.includes("Bucket not found")) {
        console.log("Retrying with 'Gallery' (capitalized)...");
        activeBucket = 'Gallery';
        const retry = await supabase.storage.from(activeBucket).upload(filePath, file);
        uploadError = retry.error;
      }

      if (uploadError) {
        if (uploadError.message.includes("Bucket not found")) {
          throw new Error("Storage bucket not found. Please ensure your bucket is named 'gallery' (all lowercase) and is set to 'Public' in the Supabase dashboard.");
        }
        if (uploadError.message.includes("row-level security")) {
          throw new Error("Permission denied. Ensure your 'gallery' bucket has RLS policies that allow public uploads.");
        }
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from(activeBucket)
        .getPublicUrl(filePath);

      // Save to Database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          url: publicUrl,
          title: suggestedTitle,
          category: detectedCategory,
          description: suggestedDescription || `A photo of our ${detectedCategory.toLowerCase()} area.`
        }]);

      if (dbError) throw dbError;

      setToast({ message: "Successfully shared to the gallery!", type: 'success' });
      setUploadDescription('');
      fetchImages();
    } catch (err: any) {
      console.error('Storage Error:', err);
      setToast({ 
        message: err.message || "Upload failed. Double-check your Supabase storage settings.", 
        type: 'error' 
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedImage || !isEditing) return;
    setIsSaving(true);
    try {
      if (selectedImage.id) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: editForm.title,
            category: editForm.category,
            description: editForm.description
          })
          .eq('id', selectedImage.id);
        if (error) throw error;
      }
      setImages(prev => prev.map(img => img.url === selectedImage.url ? { ...img, ...editForm } : img));
      setSelectedImage({ ...selectedImage, ...editForm });
      setIsEditing(false);
      setToast({ message: "Information updated.", type: 'success' });
    } catch (err: any) {
      setToast({ message: "Failed to update: " + err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!selectedImage || !selectedImage.id) return;
    if (!window.confirm("Delete this memory forever?")) return;

    setIsDeleting(true);
    try {
      const { error: dbError } = await supabase.from('gallery_images').delete().eq('id', selectedImage.id);
      if (dbError) throw dbError;

      // Extract path for storage deletion
      const urlParts = selectedImage.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `uploads/${fileName}`;

      // Try both bucket names for deletion as well
      await supabase.storage.from('gallery').remove([filePath]);
      await supabase.storage.from('Gallery').remove([filePath]);

      setImages(prev => prev.filter(img => img.id !== selectedImage.id));
      setSelectedImage(null);
      setToast({ message: "Image removed from gallery.", type: 'success' });
    } catch (err: any) {
      setToast({ message: "Delete failed: " + err.message, type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <section id="gallery" className="py-12 md:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 uppercase tracking-tight">Image Gallery</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">Discover the beauty of West Texas.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-stone-600 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if(f) processFile(f); }}
          className={`relative mb-12 p-10 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center overflow-hidden min-h-[300px] ${
            isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 bg-white'
          }`}
        >
          {isUploading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
               <div className="p-6 rounded-full mb-6 bg-emerald-50 text-emerald-600">
                <Icon name={isAnalyzing ? "Brain" : "UploadCloud"} size={48} className={isAnalyzing ? "animate-pulse" : "animate-bounce"} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                {isAnalyzing ? "Analyzing Scene..." : "Uploading to Storage..."}
              </h3>
              {!isAnalyzing && (
                <div className="w-full max-w-xs px-4">
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-4 rounded-full mb-4 bg-stone-100 text-stone-400">
            <Icon name="Plus" size={48} />
          </div>
          
          <div className="max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-stone-800">Share Your Experience</h3>
            <p className="text-stone-500 text-sm">Drag images here. AI will detect categories automatically!</p>

            <div className="flex flex-col gap-3 pt-4">
              <input 
                type="text" 
                placeholder="Story behind this photo..."
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <label className="cursor-pointer group flex items-center justify-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-xl">
                <Icon name="Image" size={20} />
                <span>Select Photo</span>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            <p className="text-[10px] text-stone-400">Admin Tip: Ensure your bucket is named 'gallery' and set to Public.</p>
          </div>

          {toast && (
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 min-w-[320px] ${
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-700 text-white'
            }`}>
              <Icon name={toast.type === 'error' ? 'AlertTriangle' : 'CheckCircle2'} size={20} />
              <p className="text-sm font-medium">{toast.message}</p>
              <button onClick={() => setToast(null)} className="ml-auto opacity-70 hover:opacity-100"><Icon name="X" size={16} /></button>
            </div>
          )}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => { setSelectedImage(img); setIsEditing(false); }}
              className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <img src={img.url} alt={img.title} className="w-full object-cover transition-all duration-500 group-hover:brightness-[0.4]" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white font-bold text-xl truncate">{img.title}</h4>
                <div className="flex items-center text-emerald-400 text-xs font-bold gap-2 mt-4">
                  <span>View Details</span>
                  <Icon name="Maximize" size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-stone-900 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-8 justify-between text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Want to see it for yourself?</h3>
            <p className="text-stone-400">Our sites fill up fast. Secure your mountain view today.</p>
          </div>
          <button className="relative z-10 bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all">Book Site Now</button>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => !isDeleting && !isSaving && setSelectedImage(null)}>
          <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md"></div>
          <div className="relative max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8" onClick={e => e.stopPropagation()}>
            <div className="w-full lg:w-2/3 flex items-center justify-center">
              <img src={selectedImage.url} alt={selectedImage.title} className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
            </div>
            <div className="w-full lg:w-1/3 text-white space-y-6 text-left">
              {isEditing ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <input type="text" value={editForm.title} onChange={e => setEditForm(p => ({...p, title: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" />
                  <select value={editForm.category} onChange={e => setEditForm(p => ({...p, category: e.target.value}))} className="w-full bg-stone-800 rounded-xl px-4 py-3 outline-none">
                    {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <textarea value={editForm.description} onChange={e => setEditForm(p => ({...p, description: e.target.value}))} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none" />
                  <div className="flex gap-3">
                    <button onClick={handleSaveEdit} disabled={isSaving} className="flex-1 bg-emerald-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                      {isSaving && <Icon name="Loader2" size={18} className="animate-spin" />} Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-6 bg-white/10 rounded-xl">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{selectedImage.category}</span>
                    <h3 className="text-3xl font-bold mt-1 mb-4">{selectedImage.title}</h3>
                    <p className="text-stone-300 italic font-light bg-white/5 p-4 rounded-2xl border border-white/5 leading-relaxed">"{selectedImage.description}"</p>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <button onClick={() => { setEditForm(selectedImage); setIsEditing(true); }} className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 py-3 rounded-xl border border-white/10">
                      <Icon name="Edit3" size={18} /> Edit
                    </button>
                    {selectedImage.id && (
                      <button onClick={handleDeleteImage} disabled={isDeleting} className="w-full flex items-center justify-center gap-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 py-3 rounded-xl border border-red-500/20">
                        <Icon name={isDeleting ? "Loader2" : "Trash2"} size={18} className={isDeleting ? "animate-spin" : ""} />
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                  </div>
                  <button onClick={() => setSelectedImage(null)} className="absolute top-0 right-0 text-white/50 hover:text-white"><Icon name="X" size={32} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
