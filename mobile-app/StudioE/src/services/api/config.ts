// API Configuration for mobile app
const API_ENDPOINTS = {
  development: 'http://localhost:3000/api',
  production: 'https://studioe-mwpgfjaom-moulderaustin-gmailcoms-projects.vercel.app/api'
};

export const API_BASE_URL = __DEV__ 
  ? API_ENDPOINTS.development 
  : API_ENDPOINTS.production;

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout'
  },
  user: {
    profile: '/user/profile',
    account: '/user/account'
  },
  events: {
    list: '/events',
    details: (id: string) => `/events/${id}`
  },
  classes: {
    list: '/classes',
    details: (id: string) => `/classes/${id}`
  },
  instructors: {
    list: '/instructors',
    details: (id: string) => `/instructors/${id}`
  }
}; 