import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PropertiesListPage from "../../pages/PropertiesListPage/PropertiesListPage";
import Header from "../Header/Header";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/home" element={<PropertiesListPage />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
