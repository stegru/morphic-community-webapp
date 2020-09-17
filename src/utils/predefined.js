import { buttonCatalog } from '@/utils/constants'

// setting the base data
export const predefinedBars = [
  {
    id: 'predefined-1',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [buttonCatalog.outlook, buttonCatalog.gmail, buttonCatalog.reddit, buttonCatalog.facebook, buttonCatalog.skype]
  },
  {
    id: 'predefined-2',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [buttonCatalog.gmail, buttonCatalog.reddit, buttonCatalog.skype]
  },
  {
    id: 'predefined-3',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [buttonCatalog.outlook, buttonCatalog.gmail, buttonCatalog.reddit, buttonCatalog.facebook]
  },
  {
    id: 'predefined-4',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [buttonCatalog.gmail, buttonCatalog.skype, buttonCatalog.facebook]
  }
]
