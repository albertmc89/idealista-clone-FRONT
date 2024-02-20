import { Property } from "../../types";
import Button from "../Button/Button";
import "./PropertyCard.css";

interface PropertyCardProps {
  property: Partial<Property>;
}

const PropertyCard = ({
  property: { address, price, rooms, meters, level, description, image1 },
}: PropertyCardProps): React.ReactElement => {
  return (
    <article className="property">
      <div className="property__container">
        <img
          className="property__picture"
          src={`${image1}`}
          alt={`Mountain views near ${address}`}
          loading="lazy"
        />
      </div>
      <div className="property__content">
        <div className="property__data-container">
          <h2 className="property__address">{address}</h2>
          <ul className="property__data-list">
            <li className="property__data-detail">
              <span className="property__data-label"></span>
              {price}$
            </li>
            <li className="property__data">
              <span className="property__data-label"></span>
              {rooms} rooms
            </li>
            <li className="property__data-detail">
              <span className="property__data-label"></span>
              {meters}m2
            </li>
            <li className="property__data">
              <span className="property__data-label"></span>
              {level}
            </li>
            <li className="property__data">
              <span className="property__data-label"></span>
              {description}
            </li>
          </ul>
        </div>
        <div className="button-container">
          <Button
            className="button button--solid"
            text="View stats"
            actionOnClick={() => {}}
          />
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
