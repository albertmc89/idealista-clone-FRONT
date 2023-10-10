import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="title-container">
        <h1>idealista</h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
