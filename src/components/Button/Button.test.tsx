import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it is rendered", () => {
    test("It should show a text 'Log out'", () => {
      const buttonText = "Log out";

      render(
        <BrowserRouter>
          <Button text="Log out" />
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
