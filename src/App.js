import React from 'react';
import Header from './components/Header';
import DailyView from './components/DailyView';

const App = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8">
      <Header />
      <main className="bg-gray-light col-span-7 p-12">
        <DailyView />
      </main>
    </div>
  );
}

export default App;
