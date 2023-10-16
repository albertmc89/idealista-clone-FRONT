import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading showing 'InvestWise'", () => {
      const headingText = "InvestWise";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
