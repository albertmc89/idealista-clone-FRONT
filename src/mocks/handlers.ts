import { rest } from "msw";
import { apiMockProperties } from "./propertiesMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_PROPERTIES_URL}properties`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ properties: apiMockProperties }));
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
];
