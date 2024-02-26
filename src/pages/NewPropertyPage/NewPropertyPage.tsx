import NewPlayerForm from "../../components/NewPropertyForm/NewPropertyForm";
import paths from "../../paths/paths";
import "./NewPropertyPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPlayerPage = (): React.ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "InvestWise | Add a new property";
  }, []);

  const onSubmitProperty = async () => {
    navigate(paths.properties);
  };

  return (
    <div className="addproperty">
      <h2 className="title">Add property</h2>
      <NewPlayerForm onSubmitProperty={onSubmitProperty} />
    </div>
  );
};

export default NewPlayerPage;
