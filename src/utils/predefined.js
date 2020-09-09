import { availableItems } from '@/utils/constants'

// setting the base data
export const predefinedBars = [
  {
    id: 'predefined-1',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [availableItems[0], availableItems[1], availableItems[2], availableItems[3], availableItems[7], availableItems[8]]
  },
  {
    id: 'predefined-2',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [availableItems[1], availableItems[2], availableItems[4], availableItems[5], availableItems[6], availableItems[7]]
  },
  {
    id: 'predefined-3',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [availableItems[0], availableItems[1], availableItems[2], availableItems[3], availableItems[4], availableItems[5]]
  },
  {
    id: 'predefined-4',
    is_shared: true,
    name: 'Predefined Preset',
    desc: 'This is predefined starter bar with some items inside, use it as a start...',
    items: [availableItems[8], availableItems[7], availableItems[6], availableItems[5], availableItems[4], availableItems[3]]
  }
]
