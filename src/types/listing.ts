export interface Listing {
    id: string;
    title: string;
    price: number;
    currency: string;
    location: {
      country: string;
      region: string;
      city: string;
      lat: number;
      lng: number;
    };
    images: string[];
    category: string;
    condition: 'new' | 'used';
    status: 'draft' | 'pending' | 'published' | 'sold' | 'cancelled' | 'expired';
  }