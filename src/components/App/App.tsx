import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import "./App.css";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
