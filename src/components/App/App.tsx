import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PropertiesListPage from "../../pages/PropertiesListPage/PropertiesListPage";
import Header from "../Header/Header";
import Homepage from "../../pages/Homepage/Homepage";
import { auth } from "../../firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import paths from "../../paths/paths";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { Suspense } from "react";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import NewPropertyPage from "../../pages/NewPropertyPage/NewPropertyPage";
import PropertyDetailPage from "../../pages/PropertyDeatilPage/PropertyDetailPage";
import Footer from "../Footer/Footer";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <main className="container">
        <Routes>
          <Route path={paths.homepage} element={<Homepage />} />
          <Route path={paths.root} element={<Navigate to={paths.homepage} />} />
          <Route
            path={paths.properties}
            element={
              <ProtectedRoute>
                <PropertiesListPage />
              </ProtectedRoute>
            }
          />
          <Route path={paths.login} element={<LoginPage />} />
          <Route
            path={paths.error}
            element={
              <Suspense>
                <ErrorPage />
              </Suspense>
            }
          />
          <Route
            path={paths.addproperty}
            element={
              <ProtectedRoute>
                <NewPropertyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${paths.properties}/:id`}
            element={
              <ProtectedRoute>
                <PropertyDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
};

export default App;
