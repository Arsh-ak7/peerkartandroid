import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import axiosInstance from './src/utils/axios';

jest.useFakeTimers();
jest.mock(
  '@react-native-async-storage/async-storage',
  async () => await mockAsyncStorage,
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  };
});

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn(),
}));
