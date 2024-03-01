import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import paths from "../../paths/paths";
import { mySelectedPropertyMock } from "../../mocks/propertiesMock";
import PropertyDetailPage from "./PropertyDetailPage";

describe("Given a PropertyDetailPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Back' as heading", () => {
      const expectedHeadingText = "Back";
      const path = `${paths.properties}/${mySelectedPropertyMock.id}`;

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <PropertyDetailPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });
  });
});
