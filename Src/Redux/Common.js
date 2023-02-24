const initialState = {
  loading: false,
  preLoader: false,
  allDetails: {},
  periodsList: [],
  isLoginButtonPress: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "PRE_LOADER": {
      return { ...state, preLoader: action.payload };
    }
    case "GET_DETAILS": {
      return { ...state, allDetails: action.payload };
    }
    case "GET_PERIODS": {
      return { ...state, periodsList: action.payload };
    }
    case "GET_LOGIN_CLICK": {
      return { ...state, isLoginButtonPress: action.payload };
    }
    default:
      return state;
  }
}
