import "./Homepage.css";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider } from "../../firebase";
import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider, browserPopupRedirectResolver);

    navigate("/properties");
  };
  return (
    <>
      <header className="header">
        <div className="title-container">
          <img src="./img/logo.png" alt="black and white building logo" />
          <h1>InvestWise</h1>
        </div>
        <Button
          className="button--transparent-primary"
          text="Login"
          actionOnClick={login}
        >
          <img src="./img/no-user.svg" alt="user icon" width={18} height={18} />
        </Button>
      </header>
      <main className="main">
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
      </main>
    </>
  );
};

export default Homepage;
