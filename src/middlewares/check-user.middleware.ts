import { auth } from "express-oauth2-jwt-bearer";

export const checkUserMiddleware = auth({
    audience: process.env.AUTH0_API_AUDIENCE,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,  
})