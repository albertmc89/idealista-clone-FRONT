import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PropertiesListPage from "../../pages/PropertiesListPage/PropertiesListPage";
import Header from "../Header/Header";
import Homepage from "../../pages/Homepage/Homepage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import paths from "../../paths/paths";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      {user && <Header />}
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
      </Routes>
    </div>
  );
};

export default App;
