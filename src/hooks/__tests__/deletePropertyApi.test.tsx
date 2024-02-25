import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { renderHook } from "@testing-library/react";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import { idPropertyMock } from "../../mocks/propertiesMock";
import useInvestmentsApi from "../useInvestmentsApi";
import { BrowserRouter } from "react-router-dom";

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

describe("Given function deletePropertyApi from useInvestmentsApi custom hook", () => {
  const id = "64fb2a9470bf0a89283a4a88";

  describe("When the function is called", () => {
    test("Then it should delete the property with the id from database", async () => {
      const expectedMessage = "Property succesfully deleted";

      const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
      const { deletePropertyApi } = result.current;

      const message = await deletePropertyApi(id);

      expect(message).toStrictEqual({ message: expectedMessage });
    });
  });

  describe("When the function is called and couldn't delete property from the Api", () => {
    test("Then it should get an error 'Couldn't delete property'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = new Error("Couldn't delete property");
      const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
      const { deletePropertyApi } = result.current;

      const error = deletePropertyApi(idPropertyMock);

      expect(error).rejects.toThrowError(expectedError);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      server.resetHandlers(...errorHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't delete property");

      const { result } = renderHook(() => useInvestmentsApi(), {
        wrapper,
      });
      const { deletePropertyApi } = result.current;

      const error = deletePropertyApi("");

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
