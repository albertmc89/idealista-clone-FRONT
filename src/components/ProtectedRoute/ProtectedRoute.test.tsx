import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter } from "react-router-dom";

describe("Given a ProtectedRoute component", () => {
  describe("When the user is logged in", () => {
    test("Then it should show 'Properties' inside a heading", () => {
      const user: Partial<User> = {
        displayName: "Albert",
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const headingText = "Properties";

      render(
        <BrowserRouter>
          <ProtectedRoute>
            <h1>Properties</h1>
          </ProtectedRoute>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
