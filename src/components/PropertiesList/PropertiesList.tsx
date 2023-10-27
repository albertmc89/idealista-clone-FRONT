import { useAppSelector } from "../../store";

const PropertiesList = () => {
  const properties = useAppSelector(
    (state) => state.propertiesState.properties,
  );

  return (
    <ul className="properties-list">
      {properties.map((property) => (
        <li key={property.id}>
          <h2>{property.address}</h2>
        </li>
      ))}
    </ul>
  );
};

export default PropertiesList;
