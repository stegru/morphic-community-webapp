import { buttonCatalog } from '@/utils/constants'

// setting the base data
export const predefinedBars = [
  {
    id: 'predefined-1',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined default bar with some items inside, use it as a start...',
    items: [buttonCatalog['E-mail'].outlook, buttonCatalog['E-mail'].gmail, buttonCatalog.Other.reddit, buttonCatalog.Other.facebook, buttonCatalog.Other.skype]
  },
  {
    id: 'predefined-2',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined default bar with some items inside, use it as a start...',
    items: [buttonCatalog['E-mail'].gmail, buttonCatalog.Other.reddit, buttonCatalog.Other.skype]
  },
  {
    id: 'predefined-3',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined default bar with some items inside, use it as a start...',
    items: [buttonCatalog['E-mail'].outlook, buttonCatalog['E-mail'].gmail, buttonCatalog.Other.reddit, buttonCatalog.Other.facebook]
  },
  {
    id: 'predefined-4',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined default bar with some items inside, use it as a start...',
    items: [buttonCatalog['E-mail'].gmail, buttonCatalog.Other.skype, buttonCatalog.Other.facebook]
  }
]
