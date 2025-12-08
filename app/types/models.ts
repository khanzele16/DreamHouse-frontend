export interface ICardImage {
  id: number;
  image: string;
}

export interface IDeveloper {
  id: number;
  name: string;
  logo: string;
}

export interface IDeveloperDetail extends IDeveloper {
  cards: ICard[];
  is_subscribed: boolean;
}

export interface IDocument {
  id: number;
  title: string;
  file: string;
  uploaded_at: string;
}

export interface IVideo {
  id: number;
  video: string;
}

export interface ICard {
  id: number;
  title: string;
  address: string;
  description: string;
  price: string;
  rooms: number;
  city: number;
  house_type: string;
  area: string;
  building_material: string;
  category: string;
  floors_total: number;
  elevator: string;
  parking: string;
  balcony: boolean;
  ceiling_height: string;
  latitude: number;
  longitude: number;
  rating: string;
  rating_count: number;
  owner: string;
  developer: IDeveloper;
  images: ICardImage[];
  videos: IVideo[];
  documents?: IDocument[];
  questions?: string[];
  recommendations?: ICard[];
  renovation?: string;
  created_at: string;
  is_favorite?: boolean;
}