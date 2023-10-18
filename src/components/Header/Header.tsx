import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = (): React.ReactElement => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate("/");
  };
  return (
    <header className="header">
      <div className="title-container">
        <img src="./img/logo.png" alt="black and white building logo" />
        <h1>InvestWise</h1>
      </div>
      <Navigation />
      <Button
        className="button--transparent-primary"
        text="Log out"
        actionOnClick={logout}
      >
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
