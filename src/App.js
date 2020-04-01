import React from 'react';
import './App.scss';
import Header from './components/Header';
import DailyView from './components/DailyView';

class App extends React.Component {
  render(){
    return (
      <div className="grid grid-cols-1 md:grid-cols-5">
        <Header />
        <main className="pmd-main col-span-4 p-12">
          <DailyView />
        </main>
      </div>
    );
  }
}

export default App;
