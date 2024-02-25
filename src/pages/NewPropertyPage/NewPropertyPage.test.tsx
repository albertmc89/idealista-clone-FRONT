import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import NewPropertyPage from "./NewPropertyPage";

describe("Given a NewPropertyPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Add property' as heading", () => {
      const expectedHeadingText = "Add property";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <NewPropertyPage />
          </Provider>
        </BrowserRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });
  });
});
