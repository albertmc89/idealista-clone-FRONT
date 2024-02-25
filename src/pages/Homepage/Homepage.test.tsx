import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";
import userEvent from "@testing-library/user-event";

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

    test("Then it should show a button 'Sign up'", () => {
      const btnAltText = "user icon";

      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>,
      );

      const btnGithub = screen.getByAltText(btnAltText);

      expect(btnGithub).toBeInTheDocument();
    });
  });

  describe("When all inputs are filled and the user submits the form", () => {
    test("Then the action on submit function should be called", async () => {
      const emailIdInput = "Email";
      const passwordIdInput = "Password";
      const buttonText = "user icon Sign up";

      const email = "albertmc89@gmail.com";
      const password = "1231231";

      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>,
      );

      const emailInput = screen.getByPlaceholderText(emailIdInput);
      const passwordInput = screen.getByPlaceholderText(passwordIdInput);

      await userEvent.type(emailInput, email);
      await userEvent.type(passwordInput, password.toString());

      const button = screen.getByRole("button", { name: buttonText });
      await userEvent.click(button);

      expect(emailInput).toHaveValue(email);
      expect(passwordInput).toHaveValue(password);
    });
  });
});
