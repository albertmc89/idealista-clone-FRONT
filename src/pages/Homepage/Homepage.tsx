import "./Homepage.css";
import { auth, gitHubProvider } from "../../firebase";
import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import paths from "../../paths/paths";
import Button from "../../components/Button/Button";
import { useAuthState } from "react-firebase-hooks/auth";

const Homepage = () => {
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to={paths.properties} />;
  }

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider, browserPopupRedirectResolver);
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
        <Button
          className="button--transparent-primary"
          text="Login"
          actionOnClick={login}
        >
          <img src="./img/no-user.svg" alt="user icon" width={18} height={18} />
        </Button>
      </div>
      <div className="main-container">
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
