export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1'

// AUTH
export const REGISTER_URL = '/auth/register'

export const VERIFY_EMAIL_URL = '/auth/verify-email'

export const LOGIN_URL = '/auth/login'

export const GOOGLE_LOGIN = '/auth/google-login'

export const LOGOUT_URL = '/auth/logout'

// DIVISIONS
export const GET_ALL_PROVINCES = '/divisions/p'

export const GET_ALL_DISTRICTS = '/divisions/d'

// ME
export const GET_CURRENT_USER = '/me'

// PROPERTIES
export const SEARCH_PROPERTIES = '/properties'

export const CHECK_PAGE_NAME_EXISTS = '/properties/check-page-name-exits'

export const CREATE_PROPERTY = '/properties'

export const GET_MY_PROPERTIES = '/me/properties'
