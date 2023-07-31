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
  WELLBEINGv1_JWT: "WELLBEINGV1_JWT"  // localstorage key
}

// .env
const prod = {
  BASE_URL: process.env.REACT_APP_PROD_BASE_URL,
  WELLBEINGv1_JWT: process.env.REACT_APP_PROD_WELLBEING_JWT
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod

