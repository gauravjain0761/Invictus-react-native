const initialState = {
  loading: false,
  preLoader: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'PRE_LOADER': {
      return {...state, preLoader: action.payload};
    }
    default:
      return state;
  }
}
