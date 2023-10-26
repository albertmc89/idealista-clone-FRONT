export interface ApiProperty {
  id: string;
  address: string;
  price: number;
  rooms: number;
  meters: number;
  year: number;
  bathrooms: number;
  aircon: boolean;
  consumption: number;
  elevator: boolean;
  parking: boolean;
  heating: boolean;
  emissions: number;
  level: string;
  description: string;
  isFavourite: boolean;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  user: string;
  __v?: number;
}

export interface ApiProperty {
  properties: ApiProperty[];
}
export interface Property extends Omit<ApiProperty, "_id"> {
  id: string;
}
