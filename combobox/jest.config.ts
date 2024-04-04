export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  // moduleNameMapper: {
  //   "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
  // },
  // moduleNameMapper: {
  //   "\\.(css|scss)$": "<rootDir>/tests/mocks/styleMock.js",
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4)$":
  //     "<rootDir>/tests/mocks/fileMock.js",
  // },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
