import constants from '../constants';

export function saveUserData(dispatch, data) {
  dispatch({
    type: constants.LOGIN_SUCCESS,
    payload: data,
  });
}

// export default logout = () => {
export const logout = () => async (dispatch, getState) => {
  dispatch({
    type: constants.LOGOUT,
  });
};
