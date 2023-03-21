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
  if (token) {
    return token;
  } else {
    return null;
  }
};

export function humanize(str) {
  var i,
    frags = str?.split("_");
  for (i = 0; i < frags?.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags?.join(" ");
}

export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function plusNumberWithCommas(x) {
  return Math.abs(x)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
