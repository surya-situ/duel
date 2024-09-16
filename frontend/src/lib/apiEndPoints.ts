import Env from "./env"

// - Base Route
export const BASE_URL = `${Env.BACKEND_URL}/api`;

// - User routes
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const CHECK_CREDENTIAL_URL = `${BASE_URL}/auth/check/credentials`;
export const FORGET_PASSWORD_URL = `${BASE_URL}/auth/forget-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

// - Duel routes
export const DUEL_URL = `${BASE_URL}/duel`;
export const DUEL_ITEMS_URL = `${BASE_URL}/duel/items`;