import { renderHook } from "@testing-library/react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import useInvestmentsApi from "../useInvestmentsApi";
import { propertiesMock } from "../../mocks/propertiesMock";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given function getProperties from useInvestmentsApi custom hook", () => {
  describe("When the function is called", () => {
    test("Then you will recieve a list of properties", async () => {
      const { result } = renderHook(() => useInvestmentsApi());
      const { getProperties } = result.current;

      const properties = await getProperties();

      expect(properties).toStrictEqual(propertiesMock);
    });
  });

  describe("When the function is called and can't get the data from the Api", () => {
    test("Then it should get an error 'Can't get any property'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = new Error("Can't get any property");
      const { result } = renderHook(() => useInvestmentsApi());
      const { getProperties } = result.current;

      const error = getProperties();

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
