// // import { AxiosResponse } from "axios";

// import { Uni } from "@/types/university";

// // load our test.json file. This can be copied to the local
// // folder. Can be a short version of your actual data set.
// // const testJson = require('../../test.json');

// // Our mocked response
// // const axiosResponse: AxiosResponse = {
// //   data: {},
// //   status: 200,
// //   statusText: "OK",
// //   headers: {},
// //   config: {},
// // };

// // axios mocked
// export default {
//   // Typescript requires a 'default'
//   default: {
//     UniService: {
//       getUnisByName: jest
//         .fn()
//         .mockImplementation(async (name: string): Promise<Uni[]> => {
//           console.log(name);
//           return Promise.resolve([
//             { name: "uni 1" },
//             { name: "uni 2" },
//             { name: "uni 3" },
//           ]);
//         }),
//     },
//   },
//   //   get: jest.fn(() => Promise.resolve({data: {}})),
// };
