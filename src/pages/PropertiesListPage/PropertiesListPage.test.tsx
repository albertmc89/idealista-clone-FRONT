import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import PropertiesListPage from "./PropertiesListPage";
import { Provider } from "react-redux";
import { store } from "../../store";

describe("Given a PropertiesListPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Properties'", () => {
      const headerText = "Properties";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PropertiesListPage />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
