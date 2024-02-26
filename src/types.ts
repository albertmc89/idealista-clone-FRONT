export interface ApiProperty {
  _id: string;
  type: string;
  address: string;
  city: string;
  price: string;
  rooms: string;
  meters: string;
  year: string;
  bathrooms: string;
  aircon: boolean;
  consumption: string;
  elevator: boolean;
  parking: boolean;
  heating: boolean;
  emissions: string;
  level: string;
  description: string;
  isFavourite: boolean;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  user: string;
}

export interface ApiProperties {
  properties: ApiProperty[];
}
export interface Property extends Omit<ApiProperty, "_id"> {
  id: string;
}
