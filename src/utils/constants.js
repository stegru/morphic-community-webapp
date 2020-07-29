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
  successfulBarSave: 'Successfully saved'
}

export const availableItems = [
  {
    'kind': 'link',
    'is_primary': true,
    'configuration': {
      'label': 'Open Reddit',
      'url': 'https://www.reddit.com/',
    }
  },
  {
    'kind': 'link',
    'is_primary': true,
    'configuration': {
      'label': 'Open Facebook',
      'url': 'https://www.facebook.com/',
    }
  },
  {
    'kind': 'link',
    'is_primary': true,
    'configuration': {
      'label': 'Photo Gallery',
      'url': 'https://www.flickr.com/photos/karadaliev',
    }
  },
  {
    'kind': 'application',
    'is_primary': true,
    'configuration': {
      'label': 'Call Skype',
      'default': 'skype',
    }
  },
  {
    'kind': 'application',
    'is_primary': true,
    'configuration': {
      'label': 'Call Telegram',
      'default': 'telegram',
    }
  },
  {
    'kind': 'application',
    'is_primary': true,
    'configuration': {
      'label': 'Call Viber',
      'default': 'viber',
    }
  },
  {
    'kind': 'action',
    'is_primary': true,
    'configuration': {
      'label': 'Open Task Manager',
      'identifier': 'taskManager',
    }
  },
  {
    'kind': 'action',
    'is_primary': true,
    'configuration': {
      'label': 'Take Screenshot',
      'identifier': 'screenshot',
    }
  },
  {
    'kind': 'action',
    'is_primary': true,
    'configuration': {
      'label': 'Magnifier',
      'identifier': 'magnifier',
    }
  }
]
