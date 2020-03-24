import { v4 as uuid }  from 'uuid'
// const faker = require('faker')
const HOME = 'indigo'
const VISITOR = 'blue'

const InitialPairs = {
  [uuid()]: {
    working: '24609',
    users: {
      [uuid()]: {
        initials: 'CD',
        team: VISITOR
      },
      [uuid()]: {
        initials: 'JH',
        team: HOME
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'MS',
        team: HOME
      },
      [uuid()]: {
        initials: 'TP',
        team: VISITOR
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'MR',
        team: VISITOR
      },
      [uuid()]: {
        initials: 'ES',
        team: HOME
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'BD',
        team: HOME
      },
      [uuid()]: {
        initials: 'RP',
        team: VISITOR
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'NH',
        team: HOME
      },
      [uuid()]: {
        initials: 'EO',
        team: HOME
      },
    },
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'KD',
        team: HOME
      },
      [uuid()]: {
        initials: 'RJ',
        team: VISITOR
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'MVS',
        team: HOME
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'AR',
        team: HOME
      },
    }
  },
  [uuid()]: {
    working: '',
    users: {
      [uuid()]: {
        initials: 'CP',
        team: VISITOR
      },
    }
  },
}
export default InitialPairs