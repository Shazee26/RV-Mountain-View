
import { Amenity, Rate, GalleryImage } from './types';

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

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1200",
    title: "Mountain Sunset View",
    category: "Scenery"
  },
  {
    url: "https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&q=80&w=1200",
    title: "Spacious RV Sites",
    category: "Park"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200",
    title: "Desert Horizon",
    category: "Scenery"
  },
  {
    url: "https://images.unsplash.com/photo-1517520287167-4bda64282b54?auto=format&fit=crop&q=80&w=1200",
    title: "Van Horn Night Sky",
    category: "Scenery"
  },
  {
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?auto=format&fit=crop&q=80&w=1200",
    title: "Camping Under the Stars",
    category: "Park"
  },
  {
    url: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&q=80&w=1200",
    title: "Gateway to the Mountains",
    category: "Scenery"
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
  name: "Mountain View RV Park",
  address: "1200 West Broadway, Van Horn, TX 79855",
  phone: "(432) 283-0123",
  email: "stay@mountainviewrvvanhorn.com",
  location: { lat: 31.0429, lng: -104.8327 },
  socials: {
    facebook: "https://facebook.com/mountainviewrvvanhorn",
    instagram: "https://instagram.com/mountainviewrvvanhorn",
    twitter: "https://twitter.com/mountainviewrv"
  }
};
