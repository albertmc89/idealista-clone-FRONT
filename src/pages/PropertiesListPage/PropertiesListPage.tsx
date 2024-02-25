import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadPropertiesActionCreator } from "../../store/properties/propertiesSlice";
import "./PropertiesListPage.css";
import PropertiesList from "../../components/PropertiesList/PropertiesList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";
import paths from "../../paths/paths";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const PropertiesListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getProperties } = useInvestmentsApi();
  const [user, isLoadingAuth] = useAuthState(auth);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const properties = useAppSelector(
    (state) => state.propertiesState.properties,
  );

  const hasProperties = properties.length === 0;

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
      {hasProperties && !isLoadingAuth && !isLoadingUi ? (
        <>
          <div className="properties-page">
            <h2 className="properties-title">Properties</h2>
            <div className="empty-container">
              <span className="empty-content" aria-label="content">
                THERE IS NO PLAYERS ON THE LIST, CLICK ADD TO START ADDING
                PLAYERS
              </span>
              <NavLink to={paths.homepage} className="button button--solid">
                Add
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <section className="properties-page">
          <h2 className="properties-title">Properties</h2>
          {isLoadingUi ? <Loading /> : <PropertiesList />}
        </section>
      )}
    </>
  );
};

export default PropertiesListPage;
