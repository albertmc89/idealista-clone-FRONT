import "./NewPropertyPage.css";
import React, { useEffect } from "react";

const NewPlayerPage = (): React.ReactElement => {
  useEffect(() => {
    document.title = "InvestWise | Add a new property";
  }, []);

  return (
    <div className="addproperty">
      <h2 className="title">Add property</h2>
    </div>
  );
};

export default NewPlayerPage;
