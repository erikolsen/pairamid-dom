import React from 'react';
import Header from './components/Header';
import DailyView from './components/DailyView';

const App = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5">
      <Header />
      <main className="bg-gray-light col-span-4 p-12">
        <DailyView />
      </main>
    </div>
  );
}

export default App;
