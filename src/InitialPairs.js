import { v4 as uuid }  from 'uuid'
const faker = require('faker')
const InitialPairs = {
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    },
  },
  [uuid()]: {
    users: {
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
      [uuid()]: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar() 
      },
    }
  },
  [uuid()]: { users: {}}
}
export default InitialPairs