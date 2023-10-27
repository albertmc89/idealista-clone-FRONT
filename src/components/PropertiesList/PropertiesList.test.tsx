import { render, screen } from "@testing-library/react";
import { propertiesMock } from "../../mocks/propertiesMock";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import PropertiesList from "./PropertiesList";

describe("Given a PropertiesList component", () => {
  describe("When it's rendered 'Calle Londres 9'", () => {
    test("Then it should show the address 'Calle Londres 9' as heading", () => {
      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });

      render(
        <Provider store={store}>
          <PropertiesList />
        </Provider>,
      );

      propertiesMock.forEach((property) => {
        const expectedHeading = screen.getByRole("heading", {
          name: property.address,
        });

        expect(expectedHeading).toBeInTheDocument();
      });
    });
  });
});
