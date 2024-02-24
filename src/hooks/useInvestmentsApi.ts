import { useCallback } from "react";
import axios from "axios";
import { ApiProperties, Property } from "../types";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const useInvestmentsApi = () => {
  const [user] = useIdToken(auth);

  const apiUrl = import.meta.env.VITE_API_PROPERTIES_URL;

  const getProperties = useCallback(async () => {
    try {
      if (user) {
        const token = await user.getIdToken();

        const { data: apiProperties } = await axios.get<ApiProperties>(
          `${apiUrl}properties`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const apiPropertiesList = apiProperties.properties;

        const properties = apiPropertiesList.map<Property>(
          ({ _id, ...apiPropertiesList }) => ({
            ...apiPropertiesList,
            id: _id,
          }),
        );

        return properties;
      }
    } catch {
      throw new Error("Can't get any property");
    }
  }, [apiUrl, user]);

  return {
    getProperties,
  };
};

export default useInvestmentsApi;
