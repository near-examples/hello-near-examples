import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  { ignores: ["build/**"] },
];

export default config;
