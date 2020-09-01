import { CONFIG } from '@/config/config'

export const BASE_URL = CONFIG.BACKEND_URL
export const ERROR_MAP = {
  1: 'Incorrect username or password!',
  2: 'That email address already exists!',
  3: 'Username already exists!',
  404: 'Cannot connect to the server right now! Please try again in couple of minutes.',
  500: 'Network error, cannot connect to the server! Please check your internet connection.'
}
export const MESSAGES = {
  successfulLogin: 'Successfully logged in',
  successfulRegistration: 'Registration completed successfully',
  successfulReset: 'Reset password successful',
  emailValidationError: 'This is a required field and must be a valid email address.',
  successfulSave: 'Successfully saved',
  barUpdated: 'Bar successfully saved, you will be returned to Dashboard soon...',
  barAdded: 'Bar successfully added, you will be returned to Dashboard soon...',
  sessionTimedOut: 'Your session was expired. Please login again.',
  leavePageAlert: 'Do you really want to leave? You have unsaved changes!',
  logoutAlert: 'Please save, or discard your chances before logging out!',
  successfulRoleChange: 'User role changed successfully',
  successfulUserDelete: 'User deleted successfully, you will be returned to Dashboard soon...',
  successfulBarDelete: 'Bar successfully deleted, you will be returned to Dashboard soon...'
}

export const colors = {
  teal: '#006770',
  blue: '#002957',
  purple: '#662261',
  red: '#8c191b',
  green: '#46622d',
  orange: '#a33e1f'
}

export const icons = {
  gmail: 'gmail.svg',
  outlook: 'outlook.svg',
  'yahoo-mail': 'yahoo-mail.svg',
  envelope: 'envelope.svg',
  'envelope-open': 'envelope-open.svg',
  'envelope-open-text': 'envelope-open-text.svg',
  'envelope-outline': 'envelope-outline.svg',
  'envelope-outline-open': 'envelope-outline-open.svg',
  facebook: 'facebook.svg',
  instagram: 'instagram.svg',
  paypal: 'paypal.svg',
  reddit: 'reddit.svg',
  skype: 'skype.svg',
  telegram: 'telegram.svg',
  twitter: 'twitter.svg',
  viber: 'viber.svg',
  whatsapp: 'whatsapp.svg',
  youtube: 'youtube.svg'
}

export const subkindIcons = {
  gmail: ['gmail', 'envelope', 'envelope-open', 'envelope-open-text', 'envelope-outline', 'envelope-outline-open'],
  outlook: ['outlook', 'envelope', 'envelope-open', 'envelope-open-text', 'envelope-outline', 'envelope-outline-open'],
  'yahoo-mail': ['yahoo-mail', 'envelope', 'envelope-open', 'envelope-open-text', 'envelope-outline', 'envelope-outline-open'],
  aolmail: ['envelope', 'envelope-open', 'envelope-open-text', 'envelope-outline', 'envelope-outline-open']
}

export const availableItems = [
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      subkind: 'gmail',
      label: 'Gmail',
      color: colors.red,
      image_url: 'gmail',
      url: 'https://mail.google.com/mail/u/0/#inbox'
    }
  },
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      subkind: 'outlook',
      label: 'Outlook',
      color: colors.blue,
      image_url: 'outlook',
      url: 'https://outlook.live.com/mail/0/inbox'
    }
  },
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      subkind: 'yahoo-mail',
      label: 'Yahoo Mail',
      color: colors.purple,
      image_url: 'yahoo-mail',
      url: 'https://mail.yahoo.com/'
    }
  },
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      subkind: 'aolmail',
      label: 'AOL Mail',
      color: colors.blue,
      image_url: 'envelope',
      url: 'https://mail.aol.com/webmail-std/en-us/suite'
    }
  },
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      label: 'Open Reddit',
      color: colors.orange,
      image_url: 'reddit',
      url: 'https://www.reddit.com/'
    }
  },
  {
    kind: 'link',
    is_primary: true,
    configuration: {
      label: 'Open Facebook',
      color: colors.blue,
      image_url: 'facebook',
      url: 'https://www.facebook.com/'
    }
  },
  {
    kind: 'application',
    is_primary: true,
    configuration: {
      label: 'Call Skype',
      color: colors.blue,
      image_url: 'skype',
      default: 'skype'
    }
  },
  {
    kind: 'application',
    is_primary: true,
    configuration: {
      label: 'Call Telegram',
      color: colors.teal,
      image_url: 'telegram',
      default: 'telegram'
    }
  },
  {
    kind: 'application',
    is_primary: true,
    configuration: {
      label: 'Call Viber',
      color: colors.purple,
      image_url: 'viber',
      default: 'viber'
    }
  },
  {
    kind: 'action',
    is_primary: true,
    configuration: {
      label: 'Open Task Manager',
      identifier: 'taskManager'
    }
  },
  {
    kind: 'action',
    is_primary: true,
    configuration: {
      label: 'Take Screenshot',
      identifier: 'screenshot'
    }
  },
  {
    kind: 'action',
    is_primary: true,
    configuration: {
      label: 'Magnifier',
      identifier: 'magnifier'
    }
  }
]
