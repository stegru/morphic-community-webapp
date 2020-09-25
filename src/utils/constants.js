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
  barUpdated: 'Bar successfully saved.',
  barAdded: 'Bar successfully added, you will be returned to Dashboard soon...',
  sessionTimedOut: 'Your session was expired. Please login again.',
  leavePageAlert: 'Do you really want to leave? You have unsaved changes!',
  logoutAlert: 'Please save, or discard your chances before logging out!',
  successfulRoleChange: 'Member role changed successfully',
  successfulMemberDelete: 'Member deleted successfully, you will be returned to Dashboard soon...',
  successfulBarDelete: 'Bar successfully deleted, you will be returned to Dashboard soon...'
}

export const colors = {
  teal: '#006770',
  blue: '#002957',
  purple: '#662261',
  red: '#8c191b',
  green: '#46622d',
  orange: '#a33e1f',
  default_button: 'rgb(0, 47, 87)'
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

export const buttonCatalog = {
  'Make a button': {
    'open-app': {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'To open an Application',
        description: 'Allows to create a button that opens an Application.',
        default: '',
        image_url: 'question_solid'
      }
    },
    'open-link': {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'To open Web Page',
        description: 'Allows to create a button that opens a Web Page.',
        url: '',
        image_url: 'question_solid'
      }
    }
  },
  'Call a Person': {
    skype: {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'Call Skype',
        color: colors.blue,
        image_url: 'skype',
        default: 'skype'
      }
    }
  },
  'Meeting Room': {
    jitsi: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'jitsi',
        label: 'Jitsi',
        color: colors.blue,
        image_url: 'jitsi',
        url: 'https://meet.jit.si/',
        description: 'Join a meeting room in Jitsi.'
      }
    },
    zoom: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'zoom',
        label: 'Zoom',
        color: colors.blue,
        image_url: 'zoom',
        url: 'https://zoom.us/',
        description: 'Join a meeting room in Zoom.'
      }
    }
  },
  'Action Buttons': {
    'quick-assist': {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'Quick Assist',
        description: 'Opens Quick Assist to get remote help (MS Windows only).',
        default: 'quick-assist',
        image_url: 'question_solid'
      }
    },
    imessage: {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'Help via iMessage',
        description: 'Opens iMessage to get remote help (Mac only).',
        default: 'imessage',
        image_url: 'question_solid'
      }
    },
    'color-vision': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Color Vision',
        description: 'Turns Color Vision On/Off.',
        identifier: 'color-vision',
        visual: {
          type: 'multiButton',
          buttons: ['On', 'Off']
        }
      }
    },
    'dark-mode': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Dark Mode',
        description: 'Turns Dark Mode On/Off.',
        identifier: 'dark-mode',
        visual: {
          type: 'multiButton',
          buttons: ['On', 'Off']
        }
      }
    },
    'high-contrast': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Contrast',
        description: 'Turns Contrast On/Off.',
        identifier: 'high-contrast',
        visual: {
          type: 'multiButton',
          buttons: ['On', 'Off']
        }
      }
    },
    magnifier: {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Magnifier',
        description: 'Turns the Screen Magnifier On/Off.',
        identifier: 'magnify',
        visual: {
          type: 'multiButton',
          buttons: ['Show', 'Hide']
        }
      }
    },
    volume: {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Volume',
        description: 'Changes the System Volume Up/Down.',
        identifier: 'volume',
        visual: {
          type: 'multiButton',
          buttons: ['+', '-'],
          extraBig: true
        }
      }
    },
    clipboard: {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Clipboard',
        description: 'Copy/Paste utility.',
        identifier: 'copy-paste',
        visual: {
          type: 'multiButton',
          buttons: ['Copy', 'Paste']
        }
      }
    },
    'text-size': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Text Size',
        description: 'Changes the Text Size.',
        identifier: 'screen-zoom',
        visual: {
          type: 'multiButton',
          buttons: ['+', '-'],
          extraBig: true
        }
      }
    },
    'night-mode': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Night Mode',
        description: 'Turns the Night Mode On/Off.',
        identifier: 'nightmode',
        visual: {
          type: 'multiButton',
          buttons: ['On', 'Off']
        }
      }
    },
    'turn-off': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Log-off Computer',
        description: 'Logs the user off the Computer.',
        identifier: 'log-off'
      }
    },
    'read-aloud': {
      kind: 'action',
      is_primary: true,
      configuration: {
        label: 'Read Aloud',
        description: 'A button that reads out the selected text.',
        identifier: 'read-aloud',
        visual: {
          type: 'multiButton',
          buttons: ['|>', '||', '[]']
        }
      }
    }
  },
  'Calendar - App on Computer': {
    'local-calendar': {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'Calendar App',
        description: 'Opens the local Calendar Application.',
        default: 'calendar',
        image_url: 'question_solid'
      }
    }
  },
  'Calendar - Website': {
    'google-calendar': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'google-calendar',
        label: 'Google Calendar',
        color: colors.blue,
        image_url: 'google-calendar',
        url: 'https://calendar.google.com/calendar/r',
        description: 'Opens the Google Calendar for the user if they are signed in.'
      }
    },
    'icloud-calendar': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'icloud-calendar',
        label: 'iCloud Calendar',
        color: colors.blue,
        image_url: 'icloud-calendar',
        url: 'https://www.icloud.com/calendar/',
        description: 'Opens the iCloud Calendar for the user if they are signed in.'
      }
    },
    'outlook-com-calendar': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'outlook-com-calendar',
        label: 'Outlook.com Calendar',
        color: colors.blue,
        image_url: 'outlook',
        url: 'https://outlook.live.com/calendar/0/',
        description: 'Opens the Outlook.com Calendar page for the user if they are signed in.'
      }
    },
    'yahoo-calendar': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'yahoo-calendar',
        label: 'Yahoo! Calendar',
        color: colors.blue,
        image_url: 'yahoo',
        url: 'https://calendar.yahoo.com/',
        description: 'Opens the Yahoo! Calendar page for the user if they are signed in.'
      }
    },
    calendly: {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'calendly',
        label: 'Calendly',
        color: colors.blue,
        image_url: 'calendly',
        url: 'https://calendly.com/',
        description: 'Opens Calendly'
      }
    },
    'zoho-calendar': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'zoho-calendar',
        label: 'Zoho Calendar',
        color: colors.blue,
        image_url: 'zoho-calendar',
        url: 'https://www.zoho.com/calendar/',
        description: 'Opens Zoho Calendar'
      }
    },
    'cozy-family-organizer': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'cozy-family-organizer',
        label: 'Cozy Family Organizer',
        color: colors.blue,
        image_url: 'cozy-family-organizer',
        url: 'https://www.cozi.com/calendar/',
        description: 'Opens Cozy Family Organizer'
      }
    },
    '30-boxes': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: '30-boxes',
        label: '30 Boxes Online Calendar',
        color: colors.blue,
        image_url: '30-boxes',
        url: 'http://30boxes.com/',
        description: '30 Boxes Online Calendar'
      }
    }
  },
  'Social Media Sites': {
    facebook: {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'Facebook',
        color: colors.blue,
        image_url: 'facebook',
        url: 'https://www.facebook.com/',
        description: 'Opens the Facebook home page for the user if they are signed in.'
      }
    },
    nextdoor: {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'Nextdoor',
        color: colors.blue,
        image_url: 'nextdoor',
        url: 'https://nextdoor.com/',
        description: 'Opens the Nextdoor home page for the user if they are signed in.'
      }
    },
    pinterest: {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'Pinterest',
        color: colors.blue,
        image_url: 'pinterest',
        url: 'https://www.pinterest.com/',
        description: 'Opens the Pinterest home page for users if they are signed in.'
      }
    },
    twitter: {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'Twitter',
        color: colors.blue,
        image_url: 'twitter',
        url: 'https://twitter.com/',
        description: 'Opens the Twitter home page for the user if they are signed in.'
      }
    },
    imgur: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'Imgur',
        color: colors.blue,
        image_url: 'imgur',
        url: 'https://imgur.com/',
        description: 'Opens the Imgur home page.'
      }
    },
    instagram: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'Instagram',
        color: colors.blue,
        image_url: 'instagram',
        url: 'https://www.instagram.com/',
        description: 'Opens the Instagram home page for the user if they are signed in.'
      }
    },
    linkedin: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'LinkedIn',
        color: colors.blue,
        image_url: 'linkedin',
        url: 'https://www.linkedin.com/',
        description: 'Opens the LinkedIn home page for the user if they are signed in.'
      }
    },
    reddit: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'Reddit',
        color: colors.blue,
        image_url: 'reddit',
        url: 'https://www.reddit.com/',
        description: 'Opens the Reddit home page.'
      }
    },
    tumblr: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'Tumblr',
        color: colors.blue,
        image_url: 'tumblr',
        url: 'https://www.tumblr.com/',
        description: 'Opens the Tumblr home page for the user if they are signed in.'
      }
    },
    youtube: {
      kind: 'link',
      is_primary: false,
      configuration: {
        label: 'Youtube',
        color: colors.red,
        image_url: 'youtube',
        url: 'https://www.youtube.com/',
        description: 'Opens the Youtube home page.'
      }
    }
  },
  'Email - App on Computer': {
    'local-email': {
      kind: 'application',
      is_primary: true,
      configuration: {
        label: 'Email App',
        description: 'Opens the default email application.',
        default: 'email',
        image_url: 'envelope'
      }
    }
  },
  'Email - Websites': {
    gmail: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'gmail',
        label: 'Gmail',
        color: colors.red,
        image_url: 'gmail',
        url: 'https://mail.google.com/mail/u/0/#inbox',
        description: 'Opens the Gmail inbox in a browser.'
      }
    },
    outlook: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'outlook',
        label: 'Outlook',
        color: colors.blue,
        image_url: 'outlook',
        url: 'https://outlook.live.com/mail/0/inbox',
        description: 'Opens the Outlook.com inbox in a browser.'
      }
    },
    'yahoo-mail': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'yahoo-mail',
        label: 'Yahoo Mail',
        color: colors.purple,
        image_url: 'yahoo-mail',
        url: 'https://mail.yahoo.com/',
        description: 'Opens the Yahoo! Mail inbox in a browser.'
      }
    },
    aolmail: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'aolmail',
        label: 'AOL Mail',
        color: colors.blue,
        image_url: 'aolmail',
        url: 'https://mail.aol.com/webmail-std/en-us/suite',
        description: 'Opens the AOL Mail inbox in a browser.'
      }
    },
    icloud: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'icloud-mail',
        label: 'iCloud',
        color: colors.grey,
        image_url: 'icloud-mail',
        url: 'https://www.icloud.com/mail',
        description: 'Opens the iCloud inbox in a browser.'
      }
    }
  },
  'Photo Sharing': {
    'Google Photos': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'google-photos',
        label: 'Google Photos',
        color: colors.blue,
        image_url: 'google-photos',
        url: 'https://photos.google.com',
        description: 'Opens your Google Photos in a browser.'
      }
    }
  },
  News: {
    cnn: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'cnn',
        label: 'CNN',
        color: colors.grey,
        image_url: 'cnn',
        url: 'https://www.cnn.com/',
        description: 'Opens the CNN home page.'
      }
    },
    'fox-news': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'fox-news',
        label: 'Fox News',
        color: colors.grey,
        image_url: 'fox-news',
        url: 'https://www.foxnews.com/',
        description: 'Opens the Fox News home page.'
      }
    },
    'google-news': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'google-news',
        label: 'Google News',
        color: colors.grey,
        image_url: 'google-news',
        url: 'https://news.google.com/',
        description: 'Opens the Google News home page.'
      }
    },
    'the-ny-times': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'the-ny-times',
        label: 'The New York Times',
        color: colors.grey,
        image_url: 'the-ny-times',
        url: 'https://www.nytimes.com/',
        description: 'Opens The New York Times home page.'
      }
    },
    'the-washington-post': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'the-washington-post',
        label: 'The Washington Post',
        color: colors.grey,
        image_url: 'the-washington-post',
        url: 'https://www.washingtonpost.com/',
        description: 'Opens The Washington Post home page.'
      }
    },
    'yahoo-news': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'yahoo-news',
        label: 'Yahoo! News',
        color: colors.grey,
        image_url: 'yahoo-news',
        url: 'https://news.yahoo.com/',
        description: 'Opens the Yahoo! News home page.'
      }
    }
  },
  Shopping: {
    amazon: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'amazon',
        label: 'Amazon',
        color: colors.grey,
        image_url: 'amazon',
        url: 'https://www.amazon.com/',
        description: 'Opens the Amazon (US) home page.'
      }
    },
    craiglist: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'craiglist',
        label: 'Craiglist',
        color: colors.grey,
        image_url: 'craiglist',
        url: 'https://www.craigslist.org/',
        description: 'Opens the Craigslist hoome page.'
      }
    },
    ebay: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'ebay',
        label: 'ebay',
        color: colors.grey,
        image_url: 'ebay',
        url: 'https://www.ebay.com/',
        description: 'Opens the ebay home page.'
      }
    },
    etsy: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'etsy',
        label: 'Etsy',
        color: colors.grey,
        image_url: 'etsy',
        url: 'https://www.etsy.com/',
        description: 'Opens the Esty home page.'
      }
    }
  },
  Media: {
    netflix: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'netflix',
        label: 'Netflix',
        color: colors.grey,
        image_url: 'netflix',
        url: 'https://www.netflix.com/',
        description: 'Opens Netflix in a browser.'
      }
    },
    pandora: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'pandora',
        label: 'Pandora',
        color: colors.grey,
        image_url: 'pandora',
        url: 'https://www.pandora.com/station',
        description: 'Opens Pandora in a browser.'
      }
    },
    spotify: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'spotify',
        label: 'Spotify',
        color: colors.grey,
        image_url: 'spotify',
        url: 'https://open.spotify.com/',
        description: 'Opens Spotify in a browser.'
      }
    },
    youtube: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'youtube',
        label: 'Youtube',
        color: colors.grey,
        image_url: 'youtube',
        url: 'https://www.youtube.com/',
        description: 'Opens Youtube in a browser.'
      }
    }
  },
  'Online Drives': {
    box: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'box',
        label: 'Box',
        color: colors.grey,
        image_url: 'box',
        url: 'https://app.box.com/folder/0',
        description: 'Opens the Box home page.'
      }
    },
    dropbox: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'dropbox',
        label: 'Dropbox',
        color: colors.blue,
        image_url: 'dropbox',
        url: 'https://www.dropbox.com/h',
        description: 'Opens the Dropbox home page.'
      }
    },
    'google-drive': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'google-drive',
        label: 'Google Drive',
        color: colors.red,
        image_url: 'google-drive',
        url: 'https://drive.google.com/',
        description: 'Opens the Google Drive home page.'
      }
    },
    'icloud-drive': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'icloud-drive',
        label: 'iCloud Drive',
        color: colors.grey,
        image_url: 'icloud-drive',
        url: 'https://www.icloud.com/iclouddrive/',
        description: 'Opens the iCloud Drive home page.'
      }
    },
    'one-drive': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'one-drive',
        label: 'OneDrive',
        color: colors.grey,
        image_url: 'one-drive',
        url: 'https://onedrive.live.com/',
        description: 'Opens the OneDrive home page.'
      }
    }
  }
}
