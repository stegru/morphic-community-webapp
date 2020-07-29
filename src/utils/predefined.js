import { availableItems } from '@/utils/constants'

// setting the base data
let predefinedBars = [
  {
    'id': 1,
    'is_shared': true,
    'name': 'Predefined Preset',
    'desc': 'This is predefined starter bar with some items inside, use it as a start...',
    'items': []
  },
  {
    'id': 2,
    'is_shared': true,
    'name': 'Predefined Preset',
    'desc': 'This is predefined starter bar with some items inside, use it as a start...',
    'items': []
  },
  {
    'id': 3,
    'is_shared': true,
    'name': 'Predefined Preset',
    'desc': 'This is predefined starter bar with some items inside, use it as a start...',
    'items': []
  },
  {
    'id': 4,
    'is_shared': true,
    'name': 'Predefined Preset',
    'desc': 'This is predefined starter bar with some items inside, use it as a start...',
    'items': []
  }
]

// fill the data with some of the predefined items
predefinedBars[0].items = [availableItems[0], availableItems[1], availableItems[2], availableItems[3], availableItems[7], availableItems[8]]
predefinedBars[1].items = [availableItems[1], availableItems[2], availableItems[4], availableItems[5], availableItems[6], availableItems[7]]
predefinedBars[2].items = [availableItems[0], availableItems[1], availableItems[2], availableItems[3], availableItems[4], availableItems[5]]
predefinedBars[3].items = [availableItems[8], availableItems[7], availableItems[6], availableItems[5], availableItems[4], availableItems[3]]

export default predefinedBars
