export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:5000/api', // Update with your Express server URL
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token'
    },
    BOOKS: {
      GET_ALL: '/books',
      GET_BY_ID: (id: string) => `/books/${id}`,
      CREATE: '/books',
      UPDATE: (id: string) => `/books/${id}`,
      DELETE: (id: string) => `/books/${id}`
    },
    LIBRARY: {
      GET_USER_LIBRARY: '/library',
      ADD_TO_LIBRARY: '/library/add',
      REMOVE_FROM_LIBRARY: '/library/remove'
    },
    FAVORITES: {
      GET_FAVORITES: '/favorites',
      ADD_TO_FAVORITES: '/favorites/add',
      REMOVE_FROM_FAVORITES: '/favorites/remove'
    },
    SEARCH: {
      SEARCH_BOOKS: '/search'
    }
  };