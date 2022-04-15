import { login } from '../src/screens/Login';
import axios from 'axios';

describe('Login tests', () => {
  describe('Login function ', () => {
    describe('with success', () => {
      const data = {
        token: '',
        id: '',
        username: '',
        email: '',
        points: '',
      };

      beforeEach(() => {
        axios.post.mockImplementationOnce(() => Promise.resolve(data));
      });

      it('should call endpoint with given email & password', async () => {
        const email = 'test@gmail.com';
        const password = 'test1234';

        await login(email, password);
        expect(axios.post).toBeCalledWith(
          'https://peerkart-bee.herokuapp.com/api/v1/auth/login',
          { email, password },
        );
      });

      it('should return response data', () => {
        const testLogin = async () => {
          const response = await login('test@gmail.com', 'test1234');
          expect(response).toStrictEqual(data);
        };

        testLogin();
      });
    });
  });
});
