import { useAppSelector } from "../../store";
import PropertyCard from "../PropertyCard/PropertyCard";
import "./PropertiesList.css";

const PropertiesList = () => {
  const properties = useAppSelector(
    (state) => state.propertiesState.properties,
  );

  return (
    <ul className="properties-list">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
};

export default PropertiesList;
