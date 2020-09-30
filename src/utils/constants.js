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
  bootstrap: 'bootstrap.svg',
  gmail: 'gmail.svg',
  outlook: 'outlook.svg',
  'yahoo-mail': 'yahoo-mail.svg',
  envelope: 'envelope.svg',
  'envelope-open': 'envelope-open.svg',
  'envelope-open-text': 'envelope-open-text.svg',
  'envelope-outline': 'envelope-outline.svg',
  'envelope-outline-open': 'envelope-outline-open.svg',
  facebook: 'facebook.svg',
  nextdoor: 'logo_nextdoor.svg',
  pinterest: 'logo_pinterest.svg',
  twitter: 'twitter.svg',
  imgur: 'logo_imgur.svg',
  instagram: 'logo_instagram.svg',
  linkedin: 'logo_linkedIn.svg',
  reddit: 'reddit.svg',
  tumblr: 'logo_tumblr.svg',
  paypal: 'paypal.svg',
  skype: 'skype.svg',
  'google-calendar': 'logo_googleCalendar.svg',
  icloud: 'logo_icloud.svg',
  telegram: 'telegram.svg',
  viber: 'viber.svg',
  whatsapp: 'whatsapp.svg',
  youtube: 'youtube.svg',
  cnn: 'logo_cnn.svg',
  foxnews: 'logo_foxNews.svg',
  'google-news': 'logo_googleNews.svg',
  nytimes: 'logo_newYorkTimes.svg',
  'the-washington-post': 'logo_washingtonPost.svg',
  yahoo: 'logo_yahoo.svg',
  abcnews: 'logo_abcNews.svg',
  aljazeera: 'logo_alJazeera.jpg',
  bbc: 'logo_bbc.svg',
  bloomberg: 'logo_bloomberg.svg',
  cbsnews: 'logo_cbsNews.svg',
  cnbc: 'logo_cnbc.svg',
  drudgereport: 'logo_drudgeReport.svg',
  forbes: 'logo_forbes.svg',
  theguardian: 'logo_theGuardian.svg',
  thehill: 'logo_theHill.jpeg',
  huffpost: 'logo_huffpost.svg',
  latimes: 'logo_laTimes.svg',
  nbcnews: 'logo_nbcNews.svg',
  npr: 'logo_npr.svg',
  reuters: 'logo_reuters.svg',
  usatoday: 'logo_usaToday.svg',
  wsj: 'logo_wsj.svg',
  yahoo: 'logo_yahoo.svg',
  amazon: 'logo_amazon.svg',
  craigslist: 'logo_craigslist.svg',
  ebay: 'logo_ebay.png',
  etsy: 'logo_etsy.svg',
  bestbuy: 'logo_bestBuy.svg',
  kohls: 'logo_kohls.svg',
  macys: 'logo_macys.svg',
  target: 'logo_target.svg',
  walmart: 'logo_walmart.svg',
  wayfair: 'logo_wayfair.png'
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
        color: colors.blue,
        image_url: 'question_solid'
      }
    },
    'open-link': {
      kind: 'link',
      is_primary: true,
      configuration: {
        label: 'To open Web Page',
        description: 'Allows to create a button that opens a Web Page.',
        color: colors.blue,
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
        subkind: 'meeting-room',
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
        subkind: 'meeting-room',
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        identifier: 'log-off',
        color: colors.blue,
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
          buttons: ['|>', '||', '[ ]']
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
        subkind: 'calendar',
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
        subkind: 'calendar',
        label: 'iCloud Calendar',
        color: colors.blue,
        image_url: 'icloud',
        url: 'https://www.icloud.com/calendar/',
        description: 'Opens the iCloud Calendar for the user if they are signed in.'
      }
    },
    'outlook-com-calendar': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'calendar',
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
        subkind: 'calendar',
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
        subkind: 'calendar',
        label: 'Calendly',
        color: colors.blue,
        image_url: '',
        url: 'https://calendly.com/',
        description: 'Opens Calendly'
      }
    },
    'zoho-calendar': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'calendar',
        label: 'Zoho Calendar',
        color: colors.blue,
        image_url: '',
        url: 'https://www.zoho.com/calendar/',
        description: 'Opens Zoho Calendar'
      }
    },
    'cozy-family-organizer': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'calendar',
        label: 'Cozy Family Organizer',
        color: colors.blue,
        image_url: '',
        url: 'https://www.cozi.com/calendar/',
        description: 'Opens Cozy Family Organizer'
      }
    },
    '30-boxes': {
      kind: 'link',
      is_primary: false,
      configuration: {
        subkind: 'calendar',
        label: '30 Boxes Online Calendar',
        color: colors.blue,
        image_url: '',
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
        image_url: 'yahoo-news',
        url: 'https://news.yahoo.com/',
        description: 'Opens the Yahoo! News home page.'
      }
    },
    'Top 15 news sites': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'News...',
        color: colors.blue,
        image_url: '',
        url: 'https://sites.google.com/raisingthefloor.org/quickfolders/news',
        description: 'Opens a page with links to the 15 most popular news websites.'
      }
    },
    'ABC News': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'ABC News',
        color: colors.blue,
        image_url: 'abcnews',
        url: 'https://abcnews.go.com/',
        description: 'Opens the ABC News home page.'
      }
    },
    'Al Jazeera': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Al Jazeera',
        color: colors.blue,
        image_url: 'aljazeera',
        url: 'https://www.aljazeera.com/',
        description: 'Opens the Al Jazeera home page.'
      }
    },
    'BBC News': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'BBC News',
        color: colors.blue,
        image_url: 'bbc',
        url: 'https://www.bbc.com/news',
        description: 'Opens the BBC News home page.'
      }
    },
    bloomberg: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Bloomberg',
        color: colors.blue,
        image_url: 'bloomberg',
        url: 'https://www.bloomberg.com/',
        description: 'Opens the Bloomberg home page.'
      }
    },
    'CBS News': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'CBS News',
        color: colors.blue,
        image_url: 'cbsnews',
        url: 'https://www.cbsnews.com/',
        description: 'Opens the CBS News home page.'
      }
    },
    cnbc: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'CNBC',
        color: colors.blue,
        image_url: 'cnbc',
        url: 'https://www.cnbc.com/',
        description: 'Opens the CNBC home page.'
      }
    },
    'Drudge Report': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Drudge Report',
        color: colors.blue,
        image_url: 'drudgereport',
        url: 'https://www.drudgereport.com/',
        description: 'Opens the Drudge Report home page.'
      }
    },
    forbes: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Forbes',
        color: colors.blue,
        image_url: 'forbes',
        url: 'https://www.forbes.com/',
        description: 'Opens the Forbes home page.'
      }
    },
    'The Guardian': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'The Guardian',
        color: colors.blue,
        image_url: 'theguardian',
        url: 'https://www.theguardian.com/us',
        description: 'Opens The Guardian home page.'
      }
    },
    'The Hill': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'The Hill',
        color: colors.blue,
        image_url: 'thehill',
        url: 'https://thehill.com/',
        description: 'Opens The Hill home page.'
      }
    },
    huffpost: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'HuffPost',
        color: colors.blue,
        image_url: 'huffpost',
        url: 'https://www.huffpost.com/',
        description: 'Opens the HuffPost home page.'
      }
    },
    "Los Angeles Times": {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Los Angeles Times',
        color: colors.blue,
        image_url: 'latimes',
        url: 'https://www.latimes.com/',
        description: 'Opens Los Angeles Times home page.'
      }
    },
    'Mail Online (Daily Mail)': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Mail Online',
        color: colors.blue,
        image_url: '',
        url: 'https://www.dailymail.co.uk/',
        description: 'Opens the Mail Online (Daily Mail) home page.'
      }
    },
    'NBC News': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'NBC News',
        color: colors.blue,
        image_url: 'nbcnews',
        url: 'https://www.nbcnews.com/',
        description: 'Opens the NBC News home page.'
      }
    },
    'New York Post': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'New York Post',
        color: colors.blue,
        image_url: '',
        url: 'https://nypost.com/',
        description: 'Opens the New York Post home page.'
      }
    },
    npr: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'NPR',
        color: colors.blue,
        image_url: 'npr',
        url: 'https://www.npr.org/',
        description: 'Opens the NPR home page.'
      }
    },
    reuters: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'Reuters',
        color: colors.blue,
        image_url: 'reuters',
        url: 'https://www.reuters.com/',
        description: 'Opens the Reuters home page.'
      }
    },
    sfGate: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'SFGate',
        color: colors.blue,
        image_url: '',
        url: 'https://www.sfgate.com/',
        description: 'Opens the SFGate home page.'
      }
    },
    'USA Today': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'USA Today',
        color: colors.blue,
        image_url: 'usatoday',
        url: 'https://www.usatoday.com/',
        description: 'Opens the USA Today home page.'
      }
    },
    'US News': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'US News',
        color: colors.blue,
        image_url: '',
        url: 'https://www.usnews.com/',
        description: 'Opens the US News home page.'
      }
    },
    'The Wall Street Journal': {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'news',
        label: 'The Wall Street Journal',
        color: colors.blue,
        image_url: 'wsj',
        url: 'https://www.wsj.com/',
        description: 'Opens The Wall Street Journal home page.'
      }
    }
  },
  Shopping: {
    amazon: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Amazon',
        color: colors.blue,
        image_url: 'amazon',
        url: 'https://www.amazon.com/',
        description: 'Opens the Amazon (US) home page.'
      }
    },
    craigslist: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Craigslist',
        color: colors.blue,
        image_url: 'craigslist',
        url: 'https://www.craigslist.org/',
        description: 'Opens the Craigslist home page.'
      }
    },
    ebay: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'ebay',
        color: colors.blue,
        image_url: 'ebay',
        url: 'https://www.ebay.com/',
        description: 'Opens the ebay home page.'
      }
    },
    etsy: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Etsy',
        color: colors.blue,
        image_url: 'etsy',
        url: 'https://www.etsy.com/',
        description: 'Opens the Esty home page.'
      }
    },
    bestbuy: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Best Buy',
        color: colors.blue,
        image_url: 'bestbuy',
        url: 'https://www.bestbuy.com/',
        description: 'Opens the Best Buy home page.'
      }
    },
    kohls: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Kohls',
        color: colors.blue,
        image_url: 'kohls',
        url: 'https://www.kohls.com/',
        description: 'Opens the Kohls home page.'
      }
    },
    Macys: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Macys',
        color: colors.blue,
        image_url: 'macys',
        url: 'https://www.macys.com/',
        description: 'Opens the Macys home page.'
      }
    },
    target: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Target',
        color: colors.blue,
        image_url: 'target',
        url: 'https://www.target.com/',
        description: 'Opens the Target home page.'
      }
    },
    walmart: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Walmart',
        color: colors.blue,
        image_url: 'walmart',
        url: 'https://www.walmart.com/',
        description: 'Opens the Walmart home page.'
      }
    },
    wayfair: {
      kind: 'link',
      is_primary: true,
      configuration: {
        subkind: 'shopping',
        label: 'Wayfair',
        color: colors.blue,
        image_url: 'wayfair',
        url: 'https://www.wayfair.com/',
        description: 'Opens the Wayfair home page.'
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
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
        color: colors.blue,
        image_url: 'one-drive',
        url: 'https://onedrive.live.com/',
        description: 'Opens the OneDrive home page.'
      }
    }
  }
}
