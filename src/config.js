/* eslint no-undef: "off" */
const appUrl = new URL(document.URL);

const {
  VITE_ENV
} = process.env;

const config = {
  env: VITE_ENV,
  appUrl: appUrl,
  servicesDir: '/api'
};

export default config;
