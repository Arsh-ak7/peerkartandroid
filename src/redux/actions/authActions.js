import constants from '../constants';
import { useDispatch } from 'react-redux';

export function saveUserData(data) {
  const dispatch = useDispatch();
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
