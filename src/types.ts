export interface ApiProperty {
  _id: string;
  type: string;
  address: string;
  city: string;
  price: number;
  rooms: number;
  meters: number;
  year: number;
  bathrooms: number;
  aircon: string;
  consumption: number;
  elevator: string;
  parking: string;
  heating: string;
  emissions: number;
  level: string;
  description: string;
  isRented: boolean;
  rent: number;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  user: string;
}

export interface ApiProperties {
  properties: ApiProperty[];
}
export interface Property extends Omit<ApiProperty, "_id"> {
  id: string;
}
