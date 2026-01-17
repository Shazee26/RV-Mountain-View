
import React from 'react';
import { Amenity, Rate } from './types';

export const AMENITIES: Amenity[] = [
  {
    id: '1',
    title: 'Full Hookups',
    description: '30/50 Amp electrical, water, and sewer at every site.',
    icon: 'Zap'
  },
  {
    id: '2',
    title: 'High-Speed Wi-Fi',
    description: 'Complimentary high-speed internet throughout the park.',
    icon: 'Wifi'
  },
  {
    id: '3',
    title: 'Laundry Facilities',
    description: 'Modern, clean laundry room available 24/7.',
    icon: 'RefreshCw'
  },
  {
    id: '4',
    title: 'Pet Friendly',
    description: 'We love your furry friends! Plenty of green space for walks.',
    icon: 'Dog'
  },
  {
    id: '5',
    title: 'Clean Restrooms',
    description: 'Meticulously maintained showers and restroom facilities.',
    icon: 'ShowerHead'
  },
  {
    id: '6',
    title: 'Spacious Sites',
    description: 'Concrete pads and wide spaces for easy maneuvering.',
    icon: 'Maximize'
  }
];

export const RATES: Rate[] = [
  {
    period: 'Daily',
    price: '$45',
    details: ['Full Hookups', 'High-speed Wi-Fi', 'All Amenities Included']
  },
  {
    period: 'Weekly',
    price: '$250',
    details: ['Best for Short Stays', 'Full Hookups Included', 'Laundry Access'],
    featured: true
  },
  {
    period: 'Monthly',
    price: '$650',
    details: ['Electricity Metered', 'Extended Stay Discount', 'Long-term Community']
  }
];

export const PARK_INFO = {
  address: "1200 West Broadway, Van Horn, TX 79855",
  phone: "(432) 283-0123",
  email: "stay@mountainviewrvvanhorn.com",
  location: { lat: 31.0429, lng: -104.8327 }
};
