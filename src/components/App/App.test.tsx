import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'logo ball with blue and yellor colors'", () => {
      const headingText = "idealista";

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
