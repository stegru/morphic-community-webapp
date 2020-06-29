import { CONFIG } from '@/config/config'

export const BASE_URL = CONFIG.BACKEND_URL
export const ERROR_MAP = {
  500: 'Network error, cannot connect to the server! Please check your internet connection.',
  404: 'Cannot connect to the server right now! Please try again in couple of minutes.'
}
export const MESSAGES = {
  successfulLogin: 'Successfully logged in',
  successfulRegistration: 'Registration completed successfully',
  successfulReset: 'Reset password successful',
  emailValidationError: 'This is a required field and must be a valid email address.'
}
