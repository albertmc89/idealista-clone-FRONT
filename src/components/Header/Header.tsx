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

    navigate("/home");
  };

  return (
    <header className="header">
      <Navigation />
      <Button
        className="button--transparent-user"
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
