import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { store } from "../../store";
import { Provider } from "react-redux";
import paths from "../../paths/paths";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a App component", () => {
  describe("When it's rendered and the user is not logged", () => {
    test("Then it should show a heading showing 'Build Wealth, One Property at a Time - Your Real Estate Sanctuary.'", async () => {
      const headingText =
        "Build Wealth, One Property at a Time - Your Real Estate Sanctuary.";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered and user clicks the login button", () => {
    test("Then the login function is called", async () => {
      const buttonText = "github icon";
      const loginRoute = paths.login;

      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[loginRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginButton = screen.getByAltText(buttonText);
      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When the button 'Log out' is clicked", () => {
    test("Then it should show a page with a 'Build Wealth, One Property at a Time - Your Real Estate Sanctuary.' inside a heading", async () => {
      const buttonAltText = "black arrow logout Log out";
      const propertiesRoute = paths.properties;

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[propertiesRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonAltText });
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("When the user is not logged in", () => {
    test("Then it should show 'InvestWise' inside a heading", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
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

  describe("When all inputs are filled and the user submits the form", () => {
    test("Then the action on submit function should be called", async () => {
      const emailIdInput = "Email";
      const passwordIdInput = "Password";
      const buttonText = "Login";
      const propertiesRoute = paths.login;

      const authStateHookMock: Partial<AuthStateHook> = [
        undefined as undefined,
      ];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const email = "albertmc89@gmail.com";
      const password = "1231231";

      render(
        <MemoryRouter initialEntries={[propertiesRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
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

  describe("When the user clicks on the Login button", () => {
    test("Then it should show 'Players' inside a heading", async () => {
      const propertiesRoute = paths.login;
      const headingText = "Properties";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[propertiesRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
