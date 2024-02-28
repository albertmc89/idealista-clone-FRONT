import { rest } from "msw";
import {
  apiMockProperties,
  handlerSelectedPropertyMock,
  idPropertyMock,
  selectedPropertyMock,
} from "./propertiesMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ properties: apiMockProperties }));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties/${
      selectedPropertyMock._id
    }`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Property succesfully deleted" }),
      );
    },
  ),
  rest.post(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json(apiMockProperties));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties/${idPropertyMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ property: handlerSelectedPropertyMock }),
      );
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Can't get any property"));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties/${
      selectedPropertyMock._id
    }`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't delete property"));
    },
  ),
  rest.post(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't create property"));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties/${idPropertyMock}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Can't load the property"));
    },
  ),
];
