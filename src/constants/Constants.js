// use to use
// import { config } from '../constants/Constants'
/*
The build folder is ready to be deployed.
You may serve it with a static server:

npm install -g serve
serve -s build
*/

const dev = {
  BASE_URL: "http://localhost:8080/api/v1",
  BASE_V2_URL: "http://localhost:8080/api/v2",
  WELLBEINGv1_JWT: "WELLBEINGV1_JWT",  // localstorage key
  MEALS_PAGE_SIZE: 20,
  AFTERMEALNOTES_PAGE_SIZE: 20,
  THOUGHTRECORDS_PAGE_SIZE: 12,
  VERSION: "1.1.4"
}

// .env
const prod = {
  BASE_URL: process.env.REACT_APP_PROD_BASE_URL,
  BASE_V2_URL: process.env.REACT_APP_PROD_BASE_V2_URL,
  WELLBEINGv1_JWT: process.env.REACT_APP_PROD_WELLBEING_JWT,
  MEALS_PAGE_SIZE: process.env.REACT_APP_MEALS_PAGE_SIZE,
  AFTERMEALNOTES_PAGE_SIZE: process.env.REACT_APP_AFTERMEALNOTES_PAGE_SIZE,
  THOUGHTRECORDS_PAGE_SIZE: process.env.REACT_APP_THOUGHTRECORDS_PAGE_SIZE,
  VERSION: "1.1.4"
}

export const config = process.env.REACT_APP_NODE_ENV === 'development' ? dev : prod

