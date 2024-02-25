import "./Homepage.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, Navigate } from "react-router-dom";
import paths from "../../paths/paths";
import Button from "../../components/Button/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const Homepage = () => {
  const [user] = useAuthState(auth);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  if (user) {
    return <Navigate to={paths.properties} />;
  }

  const registerEmailPassword = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
    } catch (error) {
      throw new Error("Can't create the user");
    }
  };

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="header">
        <div className="title-container">
          <img
            src="./img/logo.png"
            alt="black and white building logo"
            height="28"
            width="28"
          />
          <h1>InvestWise</h1>
        </div>
      </div>
      <div className="main-container">
        <h2 className="main-container__title">Crea tu cuenta ▼</h2>
        <form className="form-container" onSubmit={submitRegister}>
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            id="email"
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={registerPassword}
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Button
            className="button--opacity"
            text="Sign up"
            actionOnClick={registerEmailPassword}
          >
            <img src="./img/user.svg" alt="user icon" width="16" height="16" />
          </Button>
          <div className="form__actions">
            <div className="form__row">
              <span>Already have an account? </span>
            </div>
            <div className="form__signup">
              <NavLink className="form-link" title="Login" to={"/login"}>
                Login
              </NavLink>
            </div>
          </div>
        </form>
        <section className="section-container">
          <article className="hero-container">
            <div className="hero-container__box">
              <h2 className="box__title">
                Build Wealth, One Property at a Time - Your Real Estate
                Sanctuary.
              </h2>
            </div>
          </article>
        </section>
        <section className="extra-module">
          <article className="extra-content">
            <img
              className="extra-content__image"
              src="./img/google-maps.webp"
              alt="google maps app icon and a hand"
            />
            <div className="extra-content__text">
              <h3>Location</h3>
              <span>
                Check the area where you are looking for on a map. one of the
                most important things is where your next investment is located
              </span>
              <a href="https://www.google.com/maps">Search</a>
            </div>
          </article>
          <article className="extra-content">
            <img
              className="extra-content__image"
              src="./img/post-image.webp"
              alt="a hand with a phone"
            />
            <div className="extra-content__text">
              <h3>Post your next property</h3>
              <span>
                Here you can post your next investment with all the features
                available
              </span>
              <a href="https://www.google.com/">Post now</a>
            </div>
          </article>
          <article className="extra-content">
            <img
              className="extra-content__image"
              src="./img/mortgage.webp"
              alt="a hand with a phone"
            />
            <div className="extra-content__text">
              <h3>How to Apply for a Mortgage</h3>
              <span>
                Here you can know how to apply to get your best mortgage and
                where you can analyse your mortgage options
              </span>
              <a href="https://www.google.com/">See more</a>
            </div>
          </article>
          <article className="extra-content">
            <img
              className="extra-content__image"
              src="./img/best-realtors.webp"
              alt="Graphic with the best realtors"
            />
            <div className="extra-content__text">
              <h3>The best real estate portals</h3>
              <span>
                Here you can see a list of the best real estate portals where
                you will find your properties.
              </span>
              <a href="https://www.google.com/">See more</a>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default Homepage;
