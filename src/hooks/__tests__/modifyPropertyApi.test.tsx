import { renderHook } from "@testing-library/react";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import useInvestmentsApi from "../useInvestmentsApi";
import {
  idPropertyMock,
  mySelectedPropertyMock,
} from "../../mocks/propertiesMock";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({ uiState: { isLoading: false } });

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

describe("Given function modifyPropertyApi from useInvestmentsApi custom hook", () => {
  const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
  const { modifyPropertyApi } = result.current;

  describe("When the function is called with id '64fb2a9470bf0a89283a4a88'", () => {
    test("Then you will recieve a list of properties", async () => {
      const properties = await modifyPropertyApi(idPropertyMock, false);

      expect(properties).toStrictEqual(mySelectedPropertyMock);
    });

    test("Then it should throw an error 'Could not modify the property'", () => {
      server.resetHandlers(...errorHandlers);

      const error = new Error("Couldn't modify the property");

      const selectedDestination = modifyPropertyApi(idPropertyMock, false);

      expect(selectedDestination).rejects.toThrowError(error);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      server.resetHandlers(...errorHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't modify the property");

      const { result } = renderHook(() => useInvestmentsApi(), {
        wrapper,
      });
      const { modifyPropertyApi } = result.current;

      const error = modifyPropertyApi(idPropertyMock, true);

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
