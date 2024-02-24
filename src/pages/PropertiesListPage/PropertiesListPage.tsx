import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { loadPropertiesActionCreator } from "../../store/properties/propertiesSlice";
import "./PropertiesListPage.css";
import PropertiesList from "../../components/PropertiesList/PropertiesList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";

const PropertiesListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getProperties } = useInvestmentsApi();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      (async () => {
        const properties = await getProperties();

        dispatch(loadPropertiesActionCreator(properties!));
      })();
    }
  }, [dispatch, user, getProperties]);

  return (
    <>
      <section className="properties-page">
        <h2 className="properties-title">Properties</h2>
        <PropertiesList />
      </section>
    </>
  );
};

export default PropertiesListPage;
