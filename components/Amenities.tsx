
import React from 'react';
import { AMENITIES } from '../constants';
import Icon from './Icon';

const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">World-Class Amenities</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Whether you're staying for a night or a season, we provide everything you need for a comfortable Texas adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Icon name={amenity.icon} size={28} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{amenity.title}</h3>
              <p className="text-stone-600 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
