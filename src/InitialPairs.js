import { v4 as uuid }  from 'uuid'
// const faker = require('faker')
const HOME = 'indigo'
const VISITOR = 'blue'

const InitialPairs = {
  [uuid()]: {
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
    users: {
      [uuid()]: {
        initials: 'NH',
        team: HOME
      },
      [uuid()]: {
        initials: 'EO',
        team: HOME
      },
    }
  },
  [uuid()]: {
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
    users: {
      [uuid()]: {
        initials: 'MVS',
        team: HOME
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        initials: 'AR',
        team: HOME
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        initials: 'CP',
        team: VISITOR
      },
    }
  },
}
export default InitialPairs