import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setupStore, store } from "../../store";
import { propertiesMock } from "../../mocks/propertiesMock";
import PropertyCard from "./PropertyCard";

describe("Given a PropertyCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternate text 'First picture of Calle Londres 9'", () => {
      const alternateImageText = "Mountain views near Calle Londres 9";
      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });
      const alella = propertiesMock[0];

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PropertyCard property={alella} />
          </Provider>
        </BrowserRouter>,
      );

      const userImage = screen.getByAltText(alternateImageText);

      expect(userImage).toBeInTheDocument();
    });
  });

  test("Then it should show the heading text 'Calle Londres 9'", () => {
    const headingText = "Calle Londres 9";
    const store = setupStore({
      propertiesState: { properties: propertiesMock },
    });
    const alella = propertiesMock[0];

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PropertyCard property={alella} />
        </Provider>
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", { name: headingText });

    expect(heading).toBeInTheDocument();
  });

  test("Then it should show a text with 'No lift' inside if the properties state is false", () => {
    const mockPropertyFalseElevator = { ...propertiesMock[0], elevator: "No" };

    const headingText = "No lift";

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PropertyCard property={mockPropertyFalseElevator} />
        </Provider>
      </BrowserRouter>,
    );

    const heading = screen.getByText(headingText);

    expect(heading).toBeInTheDocument();
  });

  test("Then it should show a text with 'Lift' inside if the properties state is true", () => {
    const mockPropertyTrueElevator = { ...propertiesMock[0], elevator: "Yes" };
    const headingText = "Lift";

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PropertyCard property={mockPropertyTrueElevator} />
        </Provider>
      </BrowserRouter>,
    );

    const heading = screen.getByText(headingText);

    expect(heading).toBeInTheDocument();
  });

  test("It should show a button with the text 'not-rented' inside", () => {
    const buttonText = "not rented";

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PropertyCard property={propertiesMock[0]} />
        </Provider>
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: buttonText });

    expect(button).toBeInTheDocument();
  });
});
