export interface IRegisterForm {
  name: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  identifier: string;
  password: string;
}

export interface ICardFilters {
  area_max?: number;
  area_min?: number;
  balcony?: boolean;
  building_material?: 'brick' | 'panel' | 'monolith';
  category?: 'flat' | 'new_building';
  city?: 1 | 2 | 3;
  elevator?: 'none' | 'passenger' | 'cargo';
  floors_max?: number;
  floors_min?: number;
  house_type?: 'private' | 'apartment';
  parking?: 'none' | 'underground';
  price_max?: number;
  price_min?: number;
  rooms_max?: number;
  rooms_min?: number;
}