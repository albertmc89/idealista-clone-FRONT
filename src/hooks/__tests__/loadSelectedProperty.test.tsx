import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { renderHook } from "@testing-library/react";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import {
  mySelectedPropertyMock,
  propertiesMock,
} from "../../mocks/propertiesMock";
import useInvestmentsApi from "../useInvestmentsApi";

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
  const store = setupStore({
    propertiesState: { properties: propertiesMock },
  });

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

describe("Given function loadSelectedPropertyApi from useInvestmentsApi custom hook", () => {
  const id = "64fb2a9470bf0a89283a4a88";

  describe("When the function is called with the id '1'", () => {
    test("Then it should load from database the selected property Calle Londres'", async () => {
      const { result } = renderHook(() => useInvestmentsApi(), {
        wrapper,
      });
      const { loadSelectedPropertyApi } = result.current;

      const selectedProperty = await loadSelectedPropertyApi(id);

      expect(selectedProperty).toStrictEqual(mySelectedPropertyMock);
    });
  });

  describe("When the function is called with the id '1' and couldn't load property from the Api", () => {
    test("Then it should get an error 'Couldn't load the property'", async () => {
      server.resetHandlers(...errorHandlers);
      const error = new Error("Couldn't load the property");

      const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
      const { loadSelectedPropertyApi } = result.current;

      const selectedProperty = loadSelectedPropertyApi(id);

      expect(selectedProperty).rejects.toThrowError(error);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      server.resetHandlers(...errorHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't load the property");

      const { result } = renderHook(() => useInvestmentsApi(), {
        wrapper,
      });
      const { loadSelectedPropertyApi } = result.current;

      const error = loadSelectedPropertyApi("");

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
