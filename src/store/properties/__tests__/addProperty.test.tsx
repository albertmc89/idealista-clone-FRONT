import {
  propertiesMock,
  propertyCreatedApiMock,
} from "../../../mocks/propertiesMock";
import { PropertyState } from "../../types";
import {
  addPropertyActionCreator,
  propertiesReducer,
} from "../propertiesSlice";

describe("Given a propertiesReducer reducer", () => {
  describe("When it receives a state with one user and addProperties action", () => {
    test("Then it should return a new state with the property with id 7 added", () => {
      const currentPropertiesState: PropertyState = {
        properties: propertiesMock,
      };

      const addPropertyAction = addPropertyActionCreator(
        propertyCreatedApiMock,
      );

      const newUserState = propertiesReducer(
        currentPropertiesState,
        addPropertyAction,
      );

      expect(newUserState.properties).toContain(propertyCreatedApiMock);
      expect(newUserState.properties).toHaveLength(
        currentPropertiesState.properties.length + 1,
      );
    });
  });
});
