
export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Rate {
  period: string;
  price: string;
  details: string[];
  featured?: boolean;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: GroundingSource[];
}

export interface GalleryImage {
  url: string;
  title: string;
  category: string;
  description?: string;
}
