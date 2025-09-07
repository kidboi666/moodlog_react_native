export const ERROR_KEY = {
  // Auth related errors
  AUTH_FAILED: 'serverError.authFailed',
  AUTH_LOGIN_FAILED: 'serverError.signinFailed',
  AUTH_SIGNUP_FAILED: 'serverError.signupFailed',
  AUTH_LOGIN_INVALID_DATA: 'auth.loginFailed',
  AUTH_SIGNUP_INVALID_DATA: 'auth.registerFailed',

  // User related errors
  EMAIL_CONFLICT: 'serverError.emailConflict.title',
  USER_REGISTRATION_FAILED: 'serverError.userRegistrationFailed',
  USER_INFO_UPDATE_FAILED: 'serverError.userInfoUpdateFailed',

  // Network errors
  NETWORK: 'serverError.network',
} as const

export const SERVER_ERROR = {
  NETWORK: 'Network error occurred',
  AUTH_FAILED: 'Authentication failed',
  SIGNIN_FAILED: 'Failed to sign in',
  SIGNUP_FAILED: 'Failed to sign up',
  EMAIL_CONFLICT: 'Email already exists',
  USER_REGISTRATION_FAILED: 'Failed to register user',
  USER_INFO_UPDATE_FAILED: 'Failed to update user info',
} as const
