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
  emailValidationError: 'This is a required field and must be a valid email address.',
  successfulSave: 'Successfully saved'
}
export const availableItems = [
  {
    kind: 'link',
    is_primary: true,
    label: 'Open Reddit',
    value: 'https://www.reddit.com/',
    configuration: {}
  },
  {
    kind: 'link',
    is_primary: false,
    label: 'Open Facebook',
    value: 'https://www.facebook.com/',
    configuration: {}
  },
  {
    kind: 'link',
    is_primary: true,
    label: 'Photo Gallery',
    value: 'https://www.flickr.com/photos/karadaliev',
    configuration: {}
  },
  {
    kind: 'application',
    is_primary: true,
    label: 'Call Skype',
    value: '...',
    configuration: {}
  },
  {
    kind: 'application',
    is_primary: false,
    label: 'Call Telegram',
    value: '...',
    configuration: {}
  },
  {
    kind: 'application',
    is_primary: true,
    label: 'Call Viber',
    value: '...',
    configuration: {}
  },
  {
    kind: 'action',
    is_primary: false,
    label: 'Open Task Manager',
    value: '...',
    configuration: {}
  },
  {
    kind: 'action',
    is_primary: false,
    label: 'Take Screenshot',
    value: '...',
    configuration: {}
  },
  {
    kind: 'action',
    is_primary: true,
    label: 'Magnifier',
    value: '...',
    configuration: {}
  }
]
