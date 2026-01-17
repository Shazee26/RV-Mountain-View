
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
    url: "input_file_15.png",
    title: "Welcome to Mountain View",
    category: "Facilities",
    description: "Our iconic entrance gate welcoming travelers from across the country."
  },
  {
    url: "input_file_6.png",
    title: "Vibrant Desert Sunset",
    category: "Scenery",
    description: "Experience the legendary gold and orange hues of a West Texas sunset."
  },
  {
    url: "input_file_4.png",
    title: "Spacious Pull-Throughs",
    category: "Park",
    description: "Wide, easy-access sites designed to accommodate the largest RV rigs."
  },
  {
    url: "input_file_10.png",
    title: "Purple Twilight Skies",
    category: "Scenery",
    description: "A breathtaking display of colors over our park as day turns to night."
  },
  {
    url: "input_file_16.png",
    title: "Shady Picnic Areas",
    category: "Park",
    description: "Enjoy a meal outdoors with mature trees providing a natural canopy."
  },
  {
    url: "input_file_2.png",
    title: "Mountain Horizons",
    category: "Scenery",
    description: "Clear vistas of the surrounding peaks that give our park its name."
  },
  {
    url: "input_file_7.png",
    title: "Open Sky Camping",
    category: "Park",
    description: "The freedom of the high desert with all the modern comforts you expect."
  },
  {
    url: "input_file_9.png",
    title: "Mountain View Main Sign",
    category: "Facilities",
    description: "Look for our yellow sign on West Broadway in Van Horn."
  },
  {
    url: "input_file_17.png",
    title: "Camper's Paradise",
    category: "Park",
    description: "The perfect spot to park your van or motorhome for a relaxing stay."
  },
  {
    url: "input_file_13.png",
    title: "Moonlight Over the Rig",
    category: "Park",
    description: "Our sites are quiet and peaceful under the bright Texas moon."
  },
  {
    url: "input_file_0.png",
    title: "Silhouette Ridge",
    category: "Scenery",
    description: "The beauty of the desert flora against the fading evening light."
  },
  {
    url: "input_file_12.png",
    title: "Golden Hour Glow",
    category: "Scenery",
    description: "Everything turns to gold as the sun hits the horizon over the park."
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
