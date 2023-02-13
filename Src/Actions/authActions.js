import { api, GET, POST } from "../Helper/apiConstants";
import { getToken, makeAPIRequest } from "../Helper/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userLogin = (request) => async (dispatch) => {
  return makeAPIRequest({
    method: POST,
    url: api.login,
    data: request.data,
  })
    .then(async (response) => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        await AsyncStorage.setItem("@token", response.data.authtoken);
      }
    })
    .catch((error) => {
      console.log("error", error);
      if (request.onFail) request.onFail(error.response);
    });
};

export const getDetails = (request) => async (dispatch) => {
  const token = await getToken();

  return makeAPIRequest({
    method: GET,
    url: api.details,
    params: {
      t: token,
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        console.log("response", response);
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({ type: "GET_DETAILS", payload: response.data });
      }
    })
    .catch((error) => {
      console.log("error", error);
      if (request.onFail) request.onFail(error.response);
    });
};

export const setPeriodsList = (data) => async (dispatch) => {
  dispatch({ type: "GET_PERIODS", payload: data });
};
