
import React from 'react';
import { PARK_INFO } from '../constants';
import Icon from './Icon';

const Contact: React.FC = () => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=1200+West+Broadway,Van+Horn,TX+79855`;
  const externalMapLink = "https://www.google.com/maps/dir/?api=1&destination=1200+West+Broadway,Van+Horn,TX+79855";

  return (
    <section id="contact" className="py-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-stone-900 mb-6 uppercase tracking-tight">Visit Mountain View</h2>
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
                  <a href={`tel:${PARK_INFO.phone.replace(/\D/g, '')}`} className="text-stone-600 hover:text-emerald-600 transition-colors">{PARK_INFO.phone}</a>
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
            
            <a 
              href={externalMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all shadow-xl"
            >
              <Icon name="Navigation" size={20} />
              Open in Google Maps
            </a>
          </div>

          <div className="relative group">
            <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden relative border border-stone-200 shadow-2xl">
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
