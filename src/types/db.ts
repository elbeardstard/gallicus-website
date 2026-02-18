// Database row types — mirror the SQL table columns exactly

export interface DbBeer {
  id: string;
  name: string;
  style_fr: string;
  style_en: string;
  abv: number;
  description_fr: string;
  description_en: string;
  tasting_notes_fr: string[];
  tasting_notes_en: string[];
  image_url: string | null;
  is_core: boolean;
  is_featured: boolean;
  untappd_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  type: "brewery" | "bar" | "retail" | "restaurant";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbSiteContent {
  key: string;
  value: string;
  updated_at: string;
}
