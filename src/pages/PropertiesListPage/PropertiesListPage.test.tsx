import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import PropertiesListPage from "./PropertiesListPage";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { propertiesMock } from "../../mocks/propertiesMock";

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

  describe("When its rendered and the user clicks the delete button inside the property with id '1'", () => {
    test("Then it not should show the heading the text 'Calle Londres 9'", async () => {
      const headerText = "Calle Londres 9";
      const buttonAriaLabel = "delete logo vector";
      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PropertiesListPage />
          </Provider>
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: headerText });

      const deleteButton = await screen.findAllByLabelText(buttonAriaLabel);
      await userEvent.click(deleteButton[0]);

      expect(heading).not.toBeInTheDocument();
    });
  });
});
