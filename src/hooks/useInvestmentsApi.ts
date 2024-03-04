import { useCallback } from "react";
import axios from "axios";
import { ApiProperties, Property } from "../types";
import { auth } from "../firebase";
import { useIdToken } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/uiSlice";
import { showFeedbacks } from "../components/Feedbacks/showFeedbacks";

const useInvestmentsApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_PROPERTIES_URL;

  const getProperties = useCallback(async () => {
    dispatch(startLoadingActionCreator());
    try {
      if (user) {
        const token = await user.getIdToken();

        const { data: Properties } = await axios.get<ApiProperties>(
          `${apiUrl}properties`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const apiPropertiesList = Properties.properties;

        const properties = apiPropertiesList.map<Property>(
          ({ _id, ...apiPropertiesList }) => ({
            ...apiPropertiesList,
            id: _id,
          }),
        );
        dispatch(stopLoadingActionCreator());

        return properties;
      }
    } catch {
      dispatch(stopLoadingActionCreator());
      throw new Error("Can't get any property");
    }
  }, [apiUrl, user, dispatch]);

  const deletePropertyApi = useCallback(
    async (id: string) => {
      try {
        dispatch(startLoadingActionCreator());
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data } = await axios.delete<string>(
          `${apiUrl}properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        dispatch(stopLoadingActionCreator());

        showFeedbacks("Property successfully deleted", "success");
        return data;
      } catch (error: unknown) {
        showFeedbacks("Couldn't delete property", "error");
        throw new Error("Couldn't delete property");
      }
    },
    [apiUrl, user, dispatch],
  );

  const addPropertyApi = useCallback(
    async (newProperty: Omit<Property, "id" | "user">) => {
      try {
        if (user) {
          const token = await user.getIdToken();

          const { data: addedNewProperty } = await axios.post<Property>(
            `${apiUrl}properties`,
            newProperty,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          showFeedbacks("Property successfully added", "success");
          return addedNewProperty;
        }
      } catch (error: unknown) {
        showFeedbacks("Couldn't add property", "error");
        throw new Error("Couldn't add property");
      }
    },
    [apiUrl, user],
  );

  const loadSelectedPropertyApi = useCallback(
    async (id: string) => {
      try {
        dispatch(startLoadingActionCreator());
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data: propertyDetail } = await axios.get(
          `${apiUrl}properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        dispatch(stopLoadingActionCreator());

        const property = {
          ...propertyDetail.property,
          id: propertyDetail.property._id,
        };
        delete property._id;
        showFeedbacks("Property successfully loaded", "success");
        return property;
      } catch (error: unknown) {
        showFeedbacks("Couldn't load the property", "error");
        throw new Error("Couldn't load the property");
      }
    },
    [apiUrl, user, dispatch],
  );

  const modifyPropertyApi = useCallback(
    async (id: string, isRented: boolean) => {
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data: propertyDetail } = await axios.patch(
          `${apiUrl}properties/${id}`,
          { isRented },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const property = {
          ...propertyDetail.property,
          id: propertyDetail.property._id,
        };
        delete property._id;

        return property;
      } catch (error: unknown) {
        showFeedbacks("Couldn't modify property", "error");
        throw new Error("Couldn't modify the property");
      }
    },
    [apiUrl, user],
  );

  return {
    getProperties,
    deletePropertyApi,
    addPropertyApi,
    loadSelectedPropertyApi,
    modifyPropertyApi,
  };
};

export default useInvestmentsApi;
