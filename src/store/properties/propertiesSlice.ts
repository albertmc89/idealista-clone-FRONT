import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PropertyState } from "../types";
import { Property } from "../../types";

const initialPropertiesState: PropertyState = {
  properties: [],
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState: initialPropertiesState,
  reducers: {
    loadProperties: (
      currentPropertiesState,
      action: PayloadAction<Property[]>,
    ): PropertyState => ({
      ...currentPropertiesState,
      properties: action.payload,
    }),
  },
});

export const propertiesReducer = propertiesSlice.reducer;
export const { loadProperties: loadPropertiesActionCreator } =
  propertiesSlice.actions;
