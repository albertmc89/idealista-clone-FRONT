import { useEffect } from "react";
import { propertiesMock } from "../../mocks/propertiesMock";
import { useAppDispatch } from "../../store";
import { loadPropertiesActionCreator } from "../../store/properties/propertiesSlice";
import "./PropertiesListPage.css";

const PropertiesListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPropertiesActionCreator(propertiesMock));
  }, [dispatch]);

  return (
    <>
      <section className="properties-page">
        <h2 className="properties-title">Properties</h2>
      </section>
    </>
  );
};

export default PropertiesListPage;
