// Erreur qui sont retourner au client
export const CODE_ERROR = {
  // Authentification
  AUTH_FAILLED: 'AUTH_FAILLED',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',

  // Register
  REGISTER_NO_VALIDE: 'REGISTER_NO_VALIDE',
  DUP_EMAIL: 'DUP_EMAIL',

  // user
  USER_NOT_FOUND: 'USER_NOT_FOUND',

  // Requêtes
  QUERY_PARAM_NOT_FOUND: 'QUERY_PARAM_NOT_FOUND',

  // Server
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

// Erreur retourner par Mysql
export const CODE_ERROR_MYSQL = {
  DUP_ENTRY: 'ER_DUP_ENTRY',
} as const;
