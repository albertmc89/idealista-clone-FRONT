import NewPropertyForm from "../../components/NewPropertyForm/NewPropertyForm";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";
import paths from "../../paths/paths";
import { useAppDispatch } from "../../store";
import { addPropertyActionCreator } from "../../store/properties/propertiesSlice";
import { Property } from "../../types";
import "./NewPropertyPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPropertyPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addPropertyApi } = useInvestmentsApi();

  useEffect(() => {
    document.title = "InvestWise | Add a new property";
  }, []);

  const onSubmitProperty = async (
    newproperty: Omit<Property, "id" | "user">,
  ) => {
    const property = await addPropertyApi(newproperty);

    dispatch(addPropertyActionCreator(property!));

    navigate(paths.properties);
  };

  return (
    <div className="addproperty">
      <h2 className="title">Add property</h2>
      <NewPropertyForm onSubmitProperty={onSubmitProperty} />
    </div>
  );
};

export default NewPropertyPage;
