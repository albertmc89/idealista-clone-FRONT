import { propertiesMock } from "../../../mocks/propertiesMock";
import { PropertyState } from "../../types";
import {
  loadPropertiesActionCreator,
  propertiesReducer,
} from "../propertiesSlice";

describe("Given a propertiesReducer reducer", () => {
  describe("When it receives a load properties action with one property with address 'Calle Londres 9'", () => {
    test("Then it should return a new state with the received property", () => {
      const currentPropertyState: PropertyState = {
        properties: [],
      };
      const properties = propertiesMock;

      const loadPropertiesAction = loadPropertiesActionCreator(properties);

      const newPropertyState = propertiesReducer(
        currentPropertyState,
        loadPropertiesAction,
      );

      expect(newPropertyState).toHaveProperty("properties", properties);
    });
  });
});
