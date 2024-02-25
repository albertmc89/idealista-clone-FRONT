import { PropertyState } from "../../types";
import {
  deletePropertyActionCreator,
  propertiesReducer,
} from "../propertiesSlice";

describe("Given a propertiesReducer reducer", () => {
  describe("When it receives a state with two properties and delete property action with the id 1", () => {
    test("Then it should return a new state without the property with id 1", () => {
      const currentPropertiesState: PropertyState = {
        properties: [],
      };

      const playerToDelete = currentPropertiesState.properties.find(
        ({ id }) => id !== propertyToDeleteId,
      );
      const propertyToDeleteId = "1";
      const deletePropertiesAction =
        deletePropertyActionCreator(propertyToDeleteId);

      const newPropertyState = propertiesReducer(
        currentPropertiesState,
        deletePropertiesAction,
      );

      expect(newPropertyState.properties).not.toContain(playerToDelete);
    });
  });
});
