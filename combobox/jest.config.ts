export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  // roots: ["<rootDir>/src"],
  // moduleNameMapper: {
  //   "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
  // },
  // moduleNameMapper: {
  //   "\\.(css|scss)$": "<rootDir>/tests/mocks/styleMock.js",
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4)$":
  //     "<rootDir>/tests/mocks/fileMock.js",
  // },
  // moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^(.+\\.svg)\\?react$": "<rootDir>/src/config/__mocks__/svg.tsx",

    "^@/(.*)": "<rootDir>/src/$1", //"<rootDir>/dist/$1", "<rootDir>/$1"],
    "^assets/(.*)": "<rootDir>/src/assets/$1",
    "^pages/(.*)": "<rootDir>/src/pages/$1",
    "^components/(.*)": "<rootDir>/src/components/$1",
    "^types/(.*)": "<rootDir>/src/types/$1",
    "^hooks/(.*)": "<rootDir>/src/hooks/$1",
    "^public/(.*)": "<rootDir>/public/$1",
    // "^../assets/(.*)": "<rootDir>/src/assets/$1",
  },
};
