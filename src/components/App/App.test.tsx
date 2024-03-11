import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { setupStore, store } from "../../store";
import { Provider } from "react-redux";
import paths from "../../paths/paths";
import { propertiesMock } from "../../mocks/propertiesMock";

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
    test("Then it should show 'Properties' inside a heading", async () => {
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

  describe("When the user clicks on view details link", () => {
    test("Then it should navigate to detail page and show 'Calle Londres 9, Barcelona' inside a heading", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });
      const path = paths.properties;
      const pathDetail = "/properties/64fb2a9470bf0a89283a4a88";
      const linkText = "View details";
      const propertyText = "Building";

      render(
        <MemoryRouter initialEntries={[path, pathDetail]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const detailLink = await screen.findAllByRole("link", {
        name: linkText,
      });

      await userEvent.click(detailLink[0]);

      const heading = await screen.findByRole("heading", {
        name: propertyText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on button with text 'More...'", () => {
    test("Then it show the full description", async () => {
      const pathDetail = "/properties/64fb2a9470bf0a89283a4a88";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });
      const buttonText = "More...";
      const fullDescription =
        "¡Bienvenido al paraíso de la vida en Alella!Descubre la comodidad y el lujo de vivir en uno de los mejores pueblos de Barcelona: Alella. Este exquisito piso de 78 metros cuadrados te brinda una experiencia de vida única que no querrás dejar escapar.Este encantador hogar cuenta con tres amplias habitaciones, perfectas para adaptarse a tus necesidades y brindarte el espacio que mereces. El piso también ofrece un baño completo y un aseo. Disfruta de las vistas panorámicas y la frescura del aire mediterráneo desde tu propio balcón privado. Un lugar perfecto para relajarte con una taza de café por la mañana o disfrutar de las puestas de sol de ensueño por la noche. El piso se encuentra semiamueblado, lo que te brinda la flexibilidad para personalizarlo a tu gusto y crear el ambiente perfecto para ti y tu familia. Pero eso no es todo, este complejo residencial ofrece una piscina comunitaria donde podrás darte un chapuzón y disfrutar del sol en los cálidos días de verano. Además, tendrás un trastero a tu disposición para almacenar tus pertenencias de forma organizada y sin complicaciones. Esta es tu oportunidad de vivir en uno de los lugares más codiciados a solo 20min de Barcelona, en un piso que lo tiene todo. No pierdas la oportunidad de hacer de este lugar tu nuevo hogar. ¡Llámanos ahora para programar una visita y experimentar la vida en Alella en su máxima expresión!";

      render(
        <MemoryRouter initialEntries={[pathDetail]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const moreButton = await screen.findByRole("button", {
        name: buttonText,
      });

      await userEvent.click(moreButton);

      const descriptionAppears = await screen.findByText(fullDescription);

      expect(descriptionAppears).toBeInTheDocument();
    });
  });

  describe("When the user clicks on hamburguer", () => {
    test("Then it show the full description", async () => {
      const pathDetail = "/properties";
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });
      const buttonText = "menu bars";
      const navText = "Home";

      render(
        <MemoryRouter initialEntries={[pathDetail]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const moreButton = await screen.findByRole("button", {
        name: buttonText,
      });

      await userEvent.click(moreButton);

      const menuAppears = await screen.findAllByText(navText);

      expect(menuAppears[0]).toBeInTheDocument();
    });
  });
});

describe("Given a NewPropertyForm component rendered on App component", () => {
  describe("When the user creates a property 'newProperty' in NewPropertyPage", () => {
    test("Then it should show the PropertiesPage with 'Calle Londres 9' property", async () => {
      const typeInputLabelText = "Type of property:";
      const addressInputLabelText = "Address:";
      const cityInputLabelText = "City:";
      const priceInputLabelText = "Price:";
      const rentInputLabelText = "Rent:";
      const roomsInputLabelText = "Rooms:";
      const metersInputLabelText = "Meters (m2):";
      const yearInputLabelText = "Year:";
      const bathroomsInputLabelText = "Bathrooms:";
      const airconInputLabelText = "Aircon:";
      const consumptionInputLabelText = "Consumption:";
      const elevatorInputLabelText = "Elevator:";
      const parkingInputLabelText = "Parking:";
      const emissionsInputLabelText = "Emissions:";
      const descriptionInputLabelText = "Description:";
      const image1InputLabelText = "Image:";
      const image2InputLabelText = "Image 2:";
      const image3InputLabelText = "Image 3:";
      const image4InputLabelText = "Image 4:";
      const image5InputLabelText = "Image 5:";

      const typeText = "Apartment";
      const addressText = "Calle Londres 9";
      const cityText = "asd";
      const priceNumber = 23;
      const rentNumber = 0;
      const roomsNumber = 3;
      const metersNumber = 66;
      const yearNumber = 1997;
      const bathroomNumber = 3;
      const airconText = "Yes";
      const consumptionNumber = 34;
      const elevatorText = "Yes";
      const parkingText = "Yes";
      const emissionsNumber = 34;
      const descriptionText = "aa";
      const image1Url =
        "https://tarkettlatam.com/blog/wp-content/uploads/2023/09/5-living-sala-de-estar-piso-vinilico-amadeirado-regua-lvt-1-1536x1092-1.jpg";
      const image2Url =
        "https://tarkettlatam.com/blog/wp-content/uploads/2023/09/5-living-sala-de-estar-piso-vinilico-amadeirado-regua-lvt-1-1536x1092-1.jpg";
      const image3Url =
        "https://tarkettlatam.com/blog/wp-content/uploads/2023/09/5-living-sala-de-estar-piso-vinilico-amadeirado-regua-lvt-1-1536x1092-1.jpg";
      const image4Url =
        "https://tarkettlatam.com/blog/wp-content/uploads/2023/09/5-living-sala-de-estar-piso-vinilico-amadeirado-regua-lvt-1-1536x1092-1.jpg";
      const image5Url =
        "https://tarkettlatam.com/blog/wp-content/uploads/2023/09/5-living-sala-de-estar-piso-vinilico-amadeirado-regua-lvt-1-1536x1092-1.jpg";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({
        propertiesState: { properties: propertiesMock },
      });

      const buttonText = "Add";
      const headingText = "Calle Londres 9";

      render(
        <MemoryRouter initialEntries={[paths.addproperty]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const typeInput = await screen.findByLabelText(typeInputLabelText);
      const addressInput = await screen.findByLabelText(addressInputLabelText);
      const cityInput = await screen.findByLabelText(cityInputLabelText);
      const priceInput = await screen.findByLabelText(priceInputLabelText);
      const rentInput = await screen.findByLabelText(rentInputLabelText);
      const roomsInput = await screen.findByLabelText(roomsInputLabelText);
      const metersInput = await screen.findByLabelText(metersInputLabelText);
      const yearInput = await screen.findByLabelText(yearInputLabelText);
      const bathroomsInput = await screen.findByLabelText(
        bathroomsInputLabelText,
      );
      const airconInput = await screen.findByLabelText(airconInputLabelText);
      const consumptionInput = await screen.findByLabelText(
        consumptionInputLabelText,
      );
      const elevatorInput = await screen.findByLabelText(
        elevatorInputLabelText,
      );
      const parkingInput = await screen.findByLabelText(parkingInputLabelText);
      const emissionsInput = await screen.findByLabelText(
        emissionsInputLabelText,
      );
      const descriptionInput = await screen.findByLabelText(
        descriptionInputLabelText,
      );
      const image1Input = await screen.findByLabelText(image1InputLabelText);
      const image2Input = await screen.findByLabelText(image2InputLabelText);
      const image3Input = await screen.findByLabelText(image3InputLabelText);
      const image4Input = await screen.findByLabelText(image4InputLabelText);
      const image5Input = await screen.findByLabelText(image5InputLabelText);

      await userEvent.selectOptions(typeInput, typeText);
      await userEvent.type(addressInput, addressText);
      await userEvent.type(cityInput, cityText);
      await userEvent.type(priceInput, priceNumber.toString());
      await userEvent.type(rentInput, rentNumber.toString());
      await userEvent.type(roomsInput, roomsNumber.toString());
      await userEvent.type(metersInput, metersNumber.toString());
      await userEvent.type(yearInput, yearNumber.toString());
      await userEvent.type(bathroomsInput, bathroomNumber.toString());
      await userEvent.type(consumptionInput, consumptionNumber.toString());
      await userEvent.type(emissionsInput, emissionsNumber.toString());
      await userEvent.selectOptions(airconInput, airconText);
      await userEvent.selectOptions(parkingInput, parkingText);
      await userEvent.selectOptions(elevatorInput, elevatorText);
      await userEvent.type(descriptionInput, descriptionText);
      await userEvent.type(image1Input, image1Url);
      await userEvent.type(image2Input, image2Url);
      await userEvent.type(image3Input, image3Url);
      await userEvent.type(image4Input, image4Url);
      await userEvent.type(image5Input, image5Url);

      const button = await screen.findByRole("button", { name: buttonText });
      await userEvent.click(button);

      await waitFor(async () => {
        const heading = await screen.findByRole("heading", {
          name: headingText,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });
});
