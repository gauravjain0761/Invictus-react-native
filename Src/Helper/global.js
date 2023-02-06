import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { api } from "./apiConstants";
export const navigationRef = React.createRef();

export const makeAPIRequest = ({ method, url, data, headers, params }) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: api.BASE_URL,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then((response) => {
        console.log("axios response ::: ", response);
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
        }
        reject(error);
      });
  });

export const getToken = async () => {
  let token = await AsyncStorage.getItem("@token");
  return token;
};
