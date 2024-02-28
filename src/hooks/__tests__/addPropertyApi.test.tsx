import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { renderHook } from "@testing-library/react";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import useInvestmentsApi from "../useInvestmentsApi";
import {
  apiMockProperties,
  propertyCreatedMock,
} from "../../mocks/propertiesMock";
import { BrowserRouter } from "react-router-dom";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

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

describe("Given function addPropertyApi from useInvestmentsApi hook", () => {
  describe("When the function is called", () => {
    test("Then it should add the property to the database", async () => {
      const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
      const { addPropertyApi } = result.current;

      const newProperty = await addPropertyApi(propertyCreatedMock);

      expect(newProperty).toStrictEqual(apiMockProperties);
    });
  });

  describe("When the function is called and couldn't add property to the database", () => {
    test("Then it should get an error 'Couldn't add property'", async () => {
      const expectedError = new Error("Couldn't add property");
      server.resetHandlers(...errorHandlers);

      const { result } = renderHook(() => useInvestmentsApi(), { wrapper });
      const { addPropertyApi } = result.current;

      const error = addPropertyApi(propertyCreatedMock);

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
