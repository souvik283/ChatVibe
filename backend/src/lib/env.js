import dotenv from "dotenv"
dotenv.config()
const ENV = {
    port: process.env.port,
    mongo_url : process.env.mongo_URL,
    node_environment: process.env.NODE_ENV,
    jwt_secret : process.env.JWT_SECRET,
    resend_api_key: process.env.RESEND_API_KEY,
    resend_from_email: process.env.FORM_EMAIL,
    cloudinary_name: process.env.CLOUDINARY_API_NAME ,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY ,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    arcjet_key : process.env.ARCJET_KEY ,
    arcjet_env: process.env.ARCJET_ENV,
    client_url: process.env.CLIENT_URL,
    host_web_url: process.env.HOST_WEB_URL
}

export default ENV