require('dotenv').config();
export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const SALT = parseInt(process.env.SALT || '1');
export const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;
export const NODE_ENV = process.env.NODE_ENV;
export const URL_MS = process.env.URL_MS;
export const TOKEN_MS = process.env.TOKEN_MS;
export const ADMIN_MAIL = process.env.ADMIN_MAIL;
export const ADMIN_PASS = process.env.ADMIN_PASS;
