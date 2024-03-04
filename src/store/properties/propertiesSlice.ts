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
    deleteProperty: (
      currentPropertiesState,
      action: PayloadAction<string>,
    ): PropertyState => ({
      properties: currentPropertiesState.properties.filter(
        (property) => property.id !== action.payload,
      ),
    }),
    addProperty: (
      currentPropertiesState,
      action: PayloadAction<Property>,
    ): PropertyState => ({
      properties: [...currentPropertiesState.properties, action.payload],
    }),
    loadSelectedProperty: (
      currentPropertiesState: PropertyState,
      action: PayloadAction<Property>,
    ): PropertyState => ({
      ...currentPropertiesState,
      selectedProperty: action.payload,
    }),
    toggleProperty: (
      currentPropertiesState,
      action: PayloadAction<Property>,
    ): PropertyState => ({
      ...currentPropertiesState,
      selectedProperty: action.payload,
      properties: currentPropertiesState.properties.map((property) =>
        property.id === action.payload.id ? action.payload : property,
      ),
    }),
  },
});

export const propertiesReducer = propertiesSlice.reducer;
export const {
  loadProperties: loadPropertiesActionCreator,
  deleteProperty: deletePropertyActionCreator,
  addProperty: addPropertyActionCreator,
  loadSelectedProperty: loadSelectedPropertyActionCreator,
  toggleProperty: togglePropertyActionCreator,
} = propertiesSlice.actions;
