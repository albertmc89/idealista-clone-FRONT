import { propertyCreatedApiMock } from "../../../mocks/propertiesMock";
import { PropertyState } from "../../types";
import {
  loadSelectedPropertyActionCreator,
  propertiesReducer,
} from "../propertiesSlice";

describe("Given a properties slice", () => {
  describe("When it receives a loadSelectedProperty action", () => {
    test("Then it should return a new state with the selected property", () => {
      const currentPropertyState: PropertyState = { properties: [] };
      const loadSelectedPropertyAction = loadSelectedPropertyActionCreator(
        propertyCreatedApiMock,
      );

      const newPropertyState = propertiesReducer(
        currentPropertyState,
        loadSelectedPropertyAction,
      );

      expect(newPropertyState.selectedProperty).toStrictEqual(
        propertyCreatedApiMock,
      );
    });
  });
});
