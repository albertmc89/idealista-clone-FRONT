import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="title-container">
        <h1>idealista</h1>
      </div>
      <Navigation />
      <Button className="button--solid-primary" text="Log out">
        <img
          src="/img/arrow-logout.svg"
          alt="black arrow logout"
          width={20}
          height={20}
        />
      </Button>
    </header>
  );
};

export default Header;
