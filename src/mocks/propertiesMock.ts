import { ApiProperty, Property } from "../types";

export const propertiesMock: Property[] = [
  {
    id: "64fb2a9470bf0a89283a4a88",
    address: "Calle Londres 9",
    price: "120000",
    rooms: "3",
    meters: "78",
    year: "1995",
    bathrooms: "2",
    aircon: false,
    consumption: "150",
    elevator: false,
    parking: false,
    heating: true,
    emissions: "50",
    level: "first floor",
    description:
      "The best Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius earum dolores dolorum, aliquid iste quos perspiciatis officia et, exercitationem beatae aliquam optio, veniam aut quod quis quae quia explicabo officiis.",
    isFavourite: true,
    image1: "./img/post-image.webp",
    image2: "string",
    image3: "string",
    image4: "string",
    image5: "string",
    user: "userId",
  },
];

export const apiMockProperties: ApiProperty[] = [
  {
    _id: "64fb2a9470bf0a89283a4a88",
    address: "Calle Londres 9",
    price: "120000",
    rooms: "3",
    meters: "78",
    year: "1995",
    bathrooms: "2",
    aircon: false,
    consumption: "150",
    elevator: false,
    parking: false,
    heating: true,
    emissions: "50",
    level: "first floor",
    description:
      "The best Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius earum dolores dolorum, aliquid iste quos perspiciatis officia et, exercitationem beatae aliquam optio, veniam aut quod quis quae quia explicabo officiis.",
    isFavourite: true,
    image1: "./img/post-image.webp",
    image2: "string",
    image3: "string",
    image4: "string",
    image5: "string",
    user: "userId",
  },
];

export const idPropertyMock = propertiesMock[0].id;

export const selectedPropertyMock: ApiProperty = {
  _id: "64fb2a9470bf0a89283a4a88",
  address: "Calle Londres 9",
  price: "120000",
  rooms: "3",
  meters: "78",
  year: "1995",
  bathrooms: "2",
  aircon: false,
  consumption: "150",
  elevator: false,
  parking: false,
  heating: true,
  emissions: "50",
  level: "first floor",
  description:
    "The best Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius earum dolores dolorum, aliquid iste quos perspiciatis officia et, exercitationem beatae aliquam optio, veniam aut quod quis quae quia explicabo officiis.",
  isFavourite: true,
  image1: "./img/post-image.webp",
  image2: "string",
  image3: "string",
  image4: "string",
  image5: "string",
  user: "userId",
};
