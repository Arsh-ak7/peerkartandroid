import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../screens/Login';
import constants from '../constants';
import store from '../store';
import { useMutation, gql } from "@apollo/client";

const { dispatch } = store;

export default saveUserData = data => {
  dispatch({
    type: constants.LOGIN,
    payload: data,
  });
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default function login(username, password){
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: {
            username,
            password
        },
        onCompleted: data => {
            console.log(data);
            saveUserData(data);
            AsyncStorage.setItem('jwtToken', data.token);
        },
        onError: error => {
            console.log(error);
        }
    });
    loginUser();
}

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default function signup(username, email, password){
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        variables: {
            username,
            email,
            password
        },
        onCompleted: data => {
            console.log(data);
            saveUserData(data);
            AsyncStorage.setItem('jwtToken', data.token);
        },
        onError: error => { 
            console.log(error);
        }
    });
    registerUser();
}




export default logout = () => {
    dispatch({
        type: constants.LOGOUT,
    });
}

