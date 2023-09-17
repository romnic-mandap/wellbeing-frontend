import jwt_decode from "jwt-decode"
import { config } from '../constants/Constants'

// stringJWT, JSON.parse(stringJWT) for obj
export const getJWT = () => localStorage.getItem(config.WELLBEINGv1_JWT)

// setJWT(JSON.stringify(JWT))
export const setJWT = (stringJWT) => localStorage.setItem(config.WELLBEINGv1_JWT, stringJWT)

