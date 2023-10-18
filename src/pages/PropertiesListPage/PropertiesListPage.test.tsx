import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import PropertiesListPage from "./PropertiesListPage";

describe("Given a Homepage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Properties'", () => {
      const headerText = "Properties";

      render(
        <BrowserRouter>
          <PropertiesListPage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
