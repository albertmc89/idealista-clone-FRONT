import { NavLink } from "react-router-dom";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";
import { useAppDispatch } from "../../store";
import {
  deletePropertyActionCreator,
  togglePropertyActionCreator,
} from "../../store/properties/propertiesSlice";
import { Property } from "../../types";
import "./PropertyCard.css";
import paths from "../../paths/paths";

import Button from "../Button/Button";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../../store/ui/uiSlice";

interface PropertyCardProps {
  property: Partial<Property>;
}

const PropertyCard = ({
  property: {
    address,
    price,
    rooms,
    meters,
    level,
    description,
    image1,
    elevator,
    id,
    isRented,
  },
}: PropertyCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deletePropertyApi, modifyPropertyApi } = useInvestmentsApi();

  const deleteProperty = async () => {
    await deletePropertyApi(id!);

    dispatch(deletePropertyActionCreator(id!));
  };

  const toggleProperty = async () => {
    dispatch(startLoadingActionCreator());
    const toggledProperty = await modifyPropertyApi(id!, isRented!);

    dispatch(stopLoadingActionCreator());
    dispatch(togglePropertyActionCreator(toggledProperty));
  };

  const formatedPrice = price ? price.toLocaleString() : "";

  return (
    <article className="property">
      <div className="property__container">
        <img
          className="property__picture"
          src={image1}
          alt={`Mountain views near ${address}`}
          loading="lazy"
        />
      </div>
      <div className="property__content">
        <div className="property__data-container">
          <h2 className="property__address">{address}</h2>
          <div className="property__data">
            Mkt value:
            <span className="property__data-price">{formatedPrice}$</span>
          </div>
          <ul className="property__data-list">
            <li className="property__data">
              {rooms}
              <span className="property__data-label">hab.</span>
            </li>
            <li className="property__data">
              {meters}
              <span className="property__data-label">m2</span>
            </li>
            <li className="property__data-detail">{level} level</li>
            <li className="property__data">
              {elevator === "Yes" ? (
                <span className="property__data-detail">Lift</span>
              ) : (
                <span className="property__data-detail">No lift</span>
              )}
            </li>
          </ul>
          <div className="property__data-description">
            <p className="property__description">{description}</p>
          </div>
        </div>
        <div className="property__button">
          <NavLink className="link--solid" to={`${paths.properties}/${id}`}>
            View details
          </NavLink>
          <button onClick={deleteProperty} className="button--circle">
            <img
              src="/img/DeleteForever.svg"
              aria-label="delete logo vector"
              className="delete-logo"
              alt="delete icon"
            />
          </button>
          <div className="button-container__card">
            <Button
              className={isRented ? "rented" : "not-rented"}
              text={isRented ? "rented" : "not rented"}
              actionOnClick={toggleProperty}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
