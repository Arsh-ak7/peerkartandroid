import constants from '../constants';

const initialState = {
  userData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
      case constants.LOGOUT:
          return {
              state = null
          }
    default:
      return { ...state };
  }
}
