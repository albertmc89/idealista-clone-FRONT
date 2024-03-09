import { propertiesMock } from "../../../mocks/propertiesMock";
import { PropertyState } from "../../types";
import {
  propertiesReducer,
  togglePropertyActionCreator,
} from "../propertiesSlice";

describe("Given a properties slice", () => {
  describe("When it receives a state with a property and a toggleproperty action with id '64fb2a9470bf0a89283a4a88'", () => {
    test("Then it should return a new state with the property 'isRented' of the property with id '64fb2a9470bf0a89283a4a88' to false", () => {
      const currentPropertiesState: PropertyState = {
        properties: propertiesMock,
      };

      const toggleIsRentedAction = togglePropertyActionCreator({
        ...propertiesMock[0],
        isRented: false,
      });
      const newPropertiesState = propertiesReducer(
        currentPropertiesState,
        toggleIsRentedAction,
      );

      expect(newPropertiesState.properties[0]).toHaveProperty(
        "isRented",
        false,
      );
    });
  });

  describe("When it receives a modifyDestination action with 'Lake Louise' and a current state with no destinations", () => {
    test("Then it should return a new state with no destinations", () => {
      const currentPropertiesState: PropertyState = {
        properties: [],
      };

      const toggleIsRentedAction = togglePropertyActionCreator({
        ...propertiesMock[0],
        isRented: false,
      });

      const newPropertiesState = propertiesReducer(
        currentPropertiesState,
        toggleIsRentedAction,
      );

      expect(newPropertiesState.properties).toHaveLength(0);
    });
  });
});
