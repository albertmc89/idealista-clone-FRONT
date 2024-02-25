import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PropertiesListPage from "../../pages/PropertiesListPage/PropertiesListPage";
import Header from "../Header/Header";
import Homepage from "../../pages/Homepage/Homepage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import paths from "../../paths/paths";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Loading from "../Loading/Loading";

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
        </Routes>
      </main>
      <Loading />
    </>
  );
};

export default App;
