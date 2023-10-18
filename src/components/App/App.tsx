import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PropertiesListPage from "../../pages/PropertiesListPage/PropertiesListPage";
import Header from "../Header/Header";
import Homepage from "../../pages/Homepage/Homepage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      {user && <Header />}
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/properties" element={<PropertiesListPage />} />
      </Routes>
    </div>
  );
};

export default App;
