
import React from 'react';
import { PARK_INFO } from '../constants';
import Icon from './Icon';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-stone-900 mb-6 uppercase tracking-tight">Van Horn Hospitality</h2>
            <p className="text-stone-600 text-lg mb-10 leading-relaxed">
              Find us at the junction of I-10 and Highway 90. We're perfectly positioned for travelers heading to Big Bend, El Paso, or Carlsbad Caverns.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                  <Icon name="MapPin" size={24} />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Physical Address</p>
                  <p className="text-stone-600">{PARK_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                  <Icon name="Phone" size={24} />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Reservations Line</p>
                  <p className="text-stone-600">{PARK_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                  <Icon name="Clock" size={24} />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Office Hours</p>
                  <p className="text-stone-600">Daily: 8:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Map Placeholder for West Texas */}
            <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden relative border border-stone-200 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&q=80&w=800" 
                alt="West Texas Map Area" 
                className="w-full h-full object-cover opacity-60 grayscale brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
                  <div className="bg-emerald-600 text-white p-4 rounded-full inline-block animate-bounce mb-4 shadow-xl">
                    <Icon name="MapPin" size={32} />
                  </div>
                  <p className="font-bold text-stone-900 text-lg">Mountain View RV Park</p>
                  <p className="text-stone-600 text-sm font-semibold uppercase tracking-widest">Van Horn, TX</p>
                  <button className="mt-4 text-emerald-600 font-bold hover:underline">Open in Google Maps</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
