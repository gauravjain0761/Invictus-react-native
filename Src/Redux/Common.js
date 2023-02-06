const initialState = {
  loading: false,
  preLoader: false,
  allDetails: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "PRE_LOADER": {
      return { ...state, preLoader: action.payload };
    }
    case "GET_DETAILS": {
      return { ...state, allDetails: action.payload };
    }
    default:
      return state;
  }
}
