import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";
import NewPropertyForm from "./NewPropertyForm";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "@firebase/auth";

const onSubmitProperty = vi.fn();

const user: Partial<User> = {};
const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a NewPropertyForm component", () => {
  const typeInputLabelText = "Type of property:";
  const addressInputLabelText = "Address:";
  const cityInputLabelText = "City:";
  const priceInputLabelText = "Price:";
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
  const addressText = "sda";
  const cityText = "asd";
  const priceNumber = 23;
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

  describe("When it's rendered", () => {
    test("Then it should show a 'Type of property:', 'Address:', 'City:', 'Price:', 'Rooms:', 'Meters:', 'Year:, 'Aircon:', 'Consumption:', 'Elevator:', 'Parking:, 'Heating:', 'Emissions:' fields", () => {
      render(
        <Provider store={store}>
          <NewPropertyForm onSubmitProperty={onSubmitProperty} />
        </Provider>,
      );

      const typeInput = screen.getByLabelText(typeInputLabelText);
      const addressInput = screen.getByLabelText(addressInputLabelText);
      const cityInput = screen.getByLabelText(cityInputLabelText);
      const priceInput = screen.getByLabelText(priceInputLabelText);
      const roomsInput = screen.getByLabelText(roomsInputLabelText);
      const metersInput = screen.getByLabelText(metersInputLabelText);
      const yearInput = screen.getByLabelText(yearInputLabelText);
      const bathroomsInput = screen.getByLabelText(bathroomsInputLabelText);
      const airconInput = screen.getByLabelText(airconInputLabelText);
      const consumptionInput = screen.getByLabelText(consumptionInputLabelText);
      const elevatorInput = screen.getByLabelText(elevatorInputLabelText);
      const parkingInput = screen.getByLabelText(parkingInputLabelText);
      const emissionsInput = screen.getByLabelText(emissionsInputLabelText);
      const descriptionInput = screen.getByLabelText(descriptionInputLabelText);
      const image1Input = screen.getByLabelText(image1InputLabelText);
      const image2Input = screen.getByLabelText(image2InputLabelText);
      const image3Input = screen.getByLabelText(image3InputLabelText);
      const image4Input = screen.getByLabelText(image4InputLabelText);
      const image5Input = screen.getByLabelText(image5InputLabelText);

      expect(typeInput).toBeInTheDocument();
      expect(addressInput).toBeInTheDocument();
      expect(cityInput).toBeInTheDocument();
      expect(priceInput).toBeInTheDocument();
      expect(roomsInput).toBeInTheDocument();
      expect(metersInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
      expect(bathroomsInput).toBeInTheDocument();
      expect(airconInput).toBeInTheDocument();
      expect(consumptionInput).toBeInTheDocument();
      expect(elevatorInput).toBeInTheDocument();
      expect(parkingInput).toBeInTheDocument();
      expect(emissionsInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(image1Input).toBeInTheDocument();
      expect(image2Input).toBeInTheDocument();
      expect(image3Input).toBeInTheDocument();
      expect(image4Input).toBeInTheDocument();
      expect(image5Input).toBeInTheDocument();
    });
  });

  describe("When user writes 'Apartment', 'sda', '23', '169','Yes','Yes', 'Yes' ,'23'", () => {
    test("Then it should show 'Apartment', 'sda', '23', '169','Yes','Yes', 'Yes' ,'23'", async () => {
      render(
        <Provider store={store}>
          <NewPropertyForm onSubmitProperty={onSubmitProperty} />
        </Provider>,
      );
      const typeInput = screen.getByLabelText(typeInputLabelText);
      const addressInput = screen.getByLabelText(addressInputLabelText);
      const cityInput = screen.getByLabelText(cityInputLabelText);
      const priceInput = screen.getByLabelText(priceInputLabelText);
      const roomsInput = screen.getByLabelText(roomsInputLabelText);
      const metersInput = screen.getByLabelText(metersInputLabelText);
      const yearInput = screen.getByLabelText(yearInputLabelText);
      const bathroomsInput = screen.getByLabelText(bathroomsInputLabelText);
      const airconInput = screen.getByLabelText(airconInputLabelText);
      const consumptionInput = screen.getByLabelText(consumptionInputLabelText);
      const elevatorInput = screen.getByLabelText(elevatorInputLabelText);
      const parkingInput = screen.getByLabelText(parkingInputLabelText);
      const emissionsInput = screen.getByLabelText(emissionsInputLabelText);
      const descriptionInput = screen.getByLabelText(descriptionInputLabelText);
      const image1Input = screen.getByLabelText(image1InputLabelText);
      const image2Input = screen.getByLabelText(image2InputLabelText);
      const image3Input = screen.getByLabelText(image3InputLabelText);
      const image4Input = screen.getByLabelText(image4InputLabelText);
      const image5Input = screen.getByLabelText(image5InputLabelText);

      await userEvent.selectOptions(typeInput, typeText);
      await userEvent.type(addressInput, addressText);
      await userEvent.type(cityInput, cityText);
      await userEvent.type(priceInput, priceNumber.toString());
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

      expect(typeInput).toHaveValue(typeText);
      expect(addressInput).toHaveValue(addressText);
      expect(cityInput).toHaveValue(cityText);
      expect(priceInput).toHaveValue(priceNumber);
      expect(roomsInput).toHaveValue(roomsNumber);
      expect(metersInput).toHaveValue(metersNumber);
      expect(yearInput).toHaveValue(yearNumber);
      expect(bathroomsInput).toHaveValue(bathroomNumber);
      expect(consumptionInput).toHaveValue(consumptionNumber);
      expect(emissionsInput).toHaveValue(emissionsNumber);
      expect(airconInput).toHaveValue(airconText);
      expect(parkingInput).toHaveValue(parkingText);
      expect(elevatorInput).toHaveValue(elevatorText);
      expect(descriptionInput).toHaveValue(descriptionText);
      expect(image1Input).toHaveValue(image1Url);
      expect(image2Input).toHaveValue(image2Url);
      expect(image3Input).toHaveValue(image3Url);
      expect(image4Input).toHaveValue(image4Url);
      expect(image5Input).toHaveValue(image5Url);
    });
  });

  // describe("When all inputs are filled and the user submits the form", () => {
  //   test("Then the action on submit function should be called", async () => {
  //     const buttonText = "Add";

  //     render(
  //       <Provider store={store}>
  //         <NewPropertyForm onSubmitProperty={onSubmitProperty} />
  //       </Provider>,
  //     );

  //     const typeInput = screen.getByLabelText(typeInputLabelText);
  //     const addressInput = screen.getByLabelText(addressInputLabelText);
  //     const cityInput = screen.getByLabelText(cityInputLabelText);
  //     const priceInput = screen.getByLabelText(priceInputLabelText);
  //     const roomsInput = screen.getByLabelText(roomsInputLabelText);
  //     const metersInput = screen.getByLabelText(metersInputLabelText);
  //     const yearInput = screen.getByLabelText(yearInputLabelText);
  //     const bathroomsInput = screen.getByLabelText(bathroomsInputLabelText);
  //     const airconInput = screen.getByLabelText(airconInputLabelText);
  //     const consumptionInput = screen.getByLabelText(consumptionInputLabelText);
  //     const elevatorInput = screen.getByLabelText(elevatorInputLabelText);
  //     const parkingInput = screen.getByLabelText(parkingInputLabelText);
  //     const descriptionInput = screen.getByLabelText(descriptionInputLabelText);
  //     const emissionsInput = screen.getByLabelText(emissionsInputLabelText);
  //     const image1Input = screen.getByLabelText(image1InputLabelText);
  //     const image2Input = screen.getByLabelText(image2InputLabelText);
  //     const image3Input = screen.getByLabelText(image3InputLabelText);
  //     const image4Input = screen.getByLabelText(image4InputLabelText);
  //     const image5Input = screen.getByLabelText(image5InputLabelText);

  //     await userEvent.selectOptions(typeInput, typeText);
  //     await userEvent.type(addressInput, addressText);
  //     await userEvent.type(cityInput, cityText);
  //     await userEvent.type(priceInput, priceNumber.toString());
  //     await userEvent.type(roomsInput, roomsNumber.toString());
  //     await userEvent.type(metersInput, metersNumber.toString());
  //     await userEvent.type(yearInput, yearNumber.toString());
  //     await userEvent.type(bathroomsInput, bathroomNumber.toString());
  //     await userEvent.type(consumptionInput, consumptionNumber.toString());
  //     await userEvent.type(emissionsInput, emissionsNumber.toString());
  //     await userEvent.selectOptions(airconInput, airconText);
  //     await userEvent.selectOptions(parkingInput, parkingText);
  //     await userEvent.selectOptions(elevatorInput, elevatorText);
  //     await userEvent.type(descriptionInput, descriptionText);
  //     await userEvent.type(image1Input, image1Url);
  //     await userEvent.type(image2Input, image2Url);
  //     await userEvent.type(image3Input, image3Url);
  //     await userEvent.type(image4Input, image4Url);
  //     await userEvent.type(image5Input, image5Url);

  //     const button = screen.getByRole("button", { name: buttonText });
  //     await userEvent.click(button);

  //     expect(onSubmitProperty).toHaveBeenCalled();
  //   });
  // });
});
