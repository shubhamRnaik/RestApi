import dotenv from  "dotenv"
dotenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWTSECRET,
    REFRESHSECRET,
    APP_URL
}=process.env