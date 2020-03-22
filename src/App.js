import React from 'react';
import DailyView from './components/DailyView'

const faker = require('faker')
const pairs = [
  [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
  ],
  [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
  ],
  [
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar() 
    },
  ],

]

function App() {
  return (
    <div className="">
      <header className="bg-black text-white p-2 text-2xl">
        <h1>Pairamid</h1>
      </header>
      <DailyView pairs={pairs} />
    </div>
  );
}

export default App;
