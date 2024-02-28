import { useState } from "react";
import "./NewPropertyForm.css";
import { Property } from "../../types";

interface NewFormProps {
  onSubmitProperty: (newproperty: Omit<Property, "id" | "user">) => void;
}

const NewPropertyForm = ({ onSubmitProperty }: NewFormProps) => {
  const [newProperty, setNewProperty] = useState<Omit<Property, "id" | "user">>(
    {
      type: "",
      city: "",
      address: "",
      price: 0,
      rooms: 0,
      meters: 0,
      year: 0,
      bathrooms: 0,
      aircon: "",
      consumption: 0,
      elevator: "",
      parking: "",
      heating: "",
      emissions: 0,
      level: "",
      description: "",
      isFavourite: false,
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    },
  );

  const changeNewProperty = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setNewProperty({
      ...newProperty,
      [event.target.id]: event.target.value,
    });
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmitProperty(newProperty);
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <div className="form-control">
        <label htmlFor="type" className="form__label">
          Type of property:
        </label>
        <select
          className="form-select"
          name="type"
          id="type"
          onChange={changeNewProperty}
          required
        >
          <option value="">-- Select --</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Office">Office</option>
          <option value="Commercial property">Commercial property</option>
          <option value="Parking">Parking</option>
          <option value="Land">Land</option>
          <option value="Building">Building</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="price" className="form__label">
          Price:
        </label>
        <input
          type="number"
          id="price"
          min="1"
          value={newProperty.price}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="address" className="form__label">
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={newProperty.address}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="city" className="form__label">
          City:
        </label>
        <input
          type="text"
          id="city"
          value={newProperty.city}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="meters" className="form__label">
          Meters (m2):
        </label>
        <input
          type="number"
          min="1"
          max="1000"
          id="meters"
          value={newProperty.meters}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="rooms" className="form__label">
          Rooms:
        </label>
        <input
          type="number"
          min="1"
          max="20"
          id="rooms"
          value={newProperty.rooms}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="bathrooms" className="form__label">
          Bathrooms:
        </label>
        <input
          type="number"
          id="bathrooms"
          min="1"
          value={newProperty.bathrooms}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="level" className="form__label">
          Level:
        </label>
        <input
          type="text"
          id="level"
          value={newProperty.level}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="elevator" className="form__label">
          Elevator:
        </label>
        <select
          className="form-select"
          name="elevator"
          id="elevator"
          onChange={changeNewProperty}
          required
        >
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="year" className="form__label">
          Year:
        </label>
        <input
          type="number"
          id="year"
          min="1800"
          max="2040"
          value={newProperty.year}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="heating" className="form__label">
          Heating:
        </label>
        <select
          className="form-select"
          name="heating"
          id="heating"
          onChange={changeNewProperty}
          required
        >
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="consumption" className="form__label">
          Consumption:
        </label>
        <input
          type="number"
          id="consumption"
          min="0"
          max="10000"
          value={newProperty.consumption}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="emissions" className="form__label">
          Emissions:
        </label>
        <input
          type="number"
          id="emissions"
          min="0"
          max="10000"
          value={newProperty.emissions}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="aircon" className="form__label">
          Aircon:
        </label>
        <select
          className="form-select"
          name="aircon"
          id="aircon"
          onChange={changeNewProperty}
          required
        >
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="parking" className="form__label">
          Parking:
        </label>
        <select
          className="form-select"
          name="parking"
          id="parking"
          onChange={changeNewProperty}
          required
        >
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="description" className="form__label">
          Description:
        </label>
        <textarea
          id="description"
          value={newProperty.description}
          className="form__input"
          onChange={changeNewProperty}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="image1" className="form__label">
          Image:
        </label>
        <input
          type="url"
          id="image1"
          value={newProperty.image1}
          className="form__input"
          onChange={changeNewProperty}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image2" className="form__label">
          Image 2:
        </label>
        <input
          type="url"
          id="image2"
          value={newProperty.image2}
          className="form__input"
          onChange={changeNewProperty}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image3" className="form__label">
          Image 3:
        </label>
        <input
          type="url"
          id="image3"
          value={newProperty.image3}
          className="form__input"
          onChange={changeNewProperty}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image4" className="form__label">
          Image 4:
        </label>
        <input
          type="url"
          id="image4"
          value={newProperty.image4}
          className="form__input"
          onChange={changeNewProperty}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image5" className="form__label">
          Image 5:
        </label>
        <input
          type="url"
          id="image5"
          value={newProperty.image5}
          className="form__input"
          onChange={changeNewProperty}
        />
      </div>
      <div className="form-control">
        <button className="button--solid">Add</button>
      </div>
    </form>
  );
};

export default NewPropertyForm;
