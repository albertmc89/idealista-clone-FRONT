import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { store } from "../../store";
import { Provider } from "react-redux";
import paths from "../../paths/paths";

vi.mock("firebase/auth");

const user: Partial<User> = {};
const authStateHookMock: Partial<AuthStateHook> = [user as User];

describe("Given a App component", () => {
  describe("When it's rendered and the user is not logged", () => {
    test("Then it should show a heading showing 'Build Wealth, One Property at a Time - Your Real Estate Sanctuary.'", () => {
      const headingText =
        "Build Wealth, One Property at a Time - Your Real Estate Sanctuary.";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered and user clicks the login button", () => {
    test("Then the login function is called", async () => {
      const headingText = "Properties";
      const buttonText = "user icon Login";

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const loginButton = screen.getByRole("button", {
        name: buttonText,
      });
      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("When the button 'Log out' is clicked", () => {
      test("Then it should show a page with a 'Build Wealth, One Property at a Time - Your Real Estate Sanctuary.' inside a heading", async () => {
        const headingText =
          "Build Wealth, One Property at a Time - Your Real Estate Sanctuary.";
        const buttonAltText = "black arrow logout Log out";

        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
        );

        const logoutButton = screen.getByRole("button", {
          name: buttonAltText,
        });
        await userEvent.click(logoutButton);

        waitFor(() => {
          const heading = screen.getByRole("heading", {
            name: headingText,
          });

          expect(heading).toBeInTheDocument();
        });
      });
    });

    describe("When the user is not logged in", () => {
      test("Then it should show 'InvestWise' inside a heading", async () => {
        const authStateHookMock: Partial<AuthStateHook> = [
          undefined,
          undefined,
        ];
        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <MemoryRouter initialEntries={[paths.properties]}>
            <Provider store={store}>
              <App />
            </Provider>
          </MemoryRouter>,
        );

        const heading = await screen.findByRole("heading", {
          name: "InvestWise",
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
