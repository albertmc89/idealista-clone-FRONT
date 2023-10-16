import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";

describe("Given a Homepage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'InvestWise'", () => {
      const headerText = "InvestWise";

      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show the logo with the alternative text 'black and white building logo'", () => {
      const altText = "black and white building logo";

      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>,
      );

      const alternativeText = screen.getByAltText(altText);

      expect(alternativeText).toBeInTheDocument();
    });

    test("Then it should show the text 'Location'", () => {
      const headerText = "Location";

      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
