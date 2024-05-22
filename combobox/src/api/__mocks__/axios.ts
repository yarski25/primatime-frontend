import axios from "axios";

// export default {
//   get: jest.fn(() => Promise.resolve({ data: {} })),
// };

// const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockAxios = jest.createMockFromModule<typeof axios>("axios");

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;

// export default {
//     create: jest.fn(() => mockAxios);
//     get: jest.fn( () => Promise.resolve({ data: {} }) ),
//     delete: jest.fn( () => Promise.resolve({ data: {} }) ),
//     post: jest.fn( () => Promise.resolve({ data: {} }) )};
