import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the links 'Home' and 'Post your property'", () => {
      const navHome = "Home";
      const navPost = "Post your property";

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const navLinkHome = screen.getByRole("link", { name: navHome });
      const navLinkPost = screen.getByRole("link", { name: navPost });

      expect(navLinkHome).toBeInTheDocument();
      expect(navLinkPost).toBeInTheDocument();
    });

    test("Then it should show an alternative text 'red pointer'", () => {
      const altText = "red pointer";

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const navLinkHome = screen.getByAltText(altText);

      expect(navLinkHome).toBeInTheDocument();
    });
  });
});
