import constants from '../constants';
import store from '../store';
import { useMutation, gql } from '@apollo/client';
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
