import React from 'react';
import DailyView from './components/DailyView'

class App extends React.Component {
  render(){
    return (
      <div className="">
        <header className="bg-black text-white p-2 text-2xl">
          <h1>Pairamid</h1>
        </header>
        <DailyView />
      </div>
    );
  }
}

export default App;
