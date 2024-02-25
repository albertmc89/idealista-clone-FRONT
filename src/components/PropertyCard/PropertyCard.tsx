import { useAppDispatch } from "../../store";
import { deletePropertyActionCreator } from "../../store/properties/propertiesSlice";
import { Property } from "../../types";
import Button from "../Button/Button";
import "./PropertyCard.css";

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
  },
}: PropertyCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();

  const deleteProperty = () => {
    dispatch(deletePropertyActionCreator(id!));
  };

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
            <span className="property__data-price">{price}$</span>
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
            <li className="property__data-detail">{level}</li>
            <li className="property__data">
              {elevator === true ? (
                <span className="property__data-label">con ascensor</span>
              ) : (
                <span className="property__data-label">sin ascensor</span>
              )}
            </li>
          </ul>
          <div className="property__data-description">
            <p className="property__description">{description}</p>
          </div>
        </div>
        <div className="button-container">
          <Button
            className="button button--solid"
            text="View stats"
            actionOnClick={() => {}}
          />
        </div>
        <div className="property__button">
          <button onClick={deleteProperty} className="button--circle">
            <img
              src="/img/DeleteForever.svg"
              aria-label="delete logo vector"
              className="delete-logo"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
