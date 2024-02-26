import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";
import NewPropertyForm from "./NewPropertyForm";

describe("Given a NewPropertyForm component", () => {
  const mockSubmit = vi.fn();

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
  const imageInputLabelText = "Image:";

  describe("When it's rendered", () => {
    test("Then it should show a 'Type of property:', 'Address:', 'City:', 'Price:', 'Rooms:', 'Meters:', 'Year:, 'Aircon:', 'Consumption:', 'Elevator:', 'Parking:, 'Heating:', 'Emissions:' fields", () => {
      render(
        <Provider store={store}>
          <NewPropertyForm onSubmitProperty={mockSubmit} />
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
      const imageInput = screen.getByLabelText(imageInputLabelText);

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
      expect(imageInput).toBeInTheDocument();
    });
  });

  describe("When user writes 'Leo Messi', '36', 'Argentina', '169','818','1038', 'ST' ,'https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp'", () => {
    test("Then it should show 'Leo Messi', '36', 'Argentina', '169','818','1038', 'ST' ,'https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp'", async () => {
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

      render(
        <Provider store={store}>
          <NewPropertyForm onSubmitProperty={mockSubmit} />
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
    });
  });

  // describe("When all inputs are filled and the user submits the form", () => {
  //   test("Then the action on submit function should be called", async () => {
  //     const buttonText = "Add";

  //     const typeText = "Apartment";
  //     const addressText = "sda";
  //     const cityText = "asd";
  //     const priceNumber = 23;
  //     const roomsNumber = 3;
  //     const metersNumber = 66;
  //     const yearNumber = 1997;
  //     const bathroomNumber = 3;
  //     const airconText = "Yes";
  //     const consumptionNumber = 34;
  //     const elevatorText = "Yes";
  //     const parkingText = "Yes";
  //     const emissionsNumber = 34;

  //     render(<NewPropertyForm onSubmitProperty={mockSubmit} />);

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
  //     const emissionsInput = screen.getByLabelText(emissionsInputLabelText);

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

  //     const button = screen.getByRole("button", { name: buttonText });
  //     await userEvent.click(button);

  //     expect(mockSubmit).toHaveBeenCalled();
  //   });
  // });
});
