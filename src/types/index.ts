export interface Beer {
  id: string;
  name: string;
  slug?: string;
  style: string;
  abv: number;
  description: string;
  image: string;
  model3d?: string;
  isCore: boolean;
  isFeatured: boolean;
  untappdUrl?: string;
  rating?: number;
  tastingNotes?: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  type: "bar" | "retail" | "restaurant";
}

export interface SiteContent {
  heroTagline: string;
  aboutText: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  hours?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    untappd?: string;
  };
}

export type Locale = "fr" | "en";
