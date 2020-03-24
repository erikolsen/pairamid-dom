import React from 'react';
import DailyView from './components/DailyView'

class App extends React.Component {
  render(){
    return (
      <div className="">
        <header className="flex bg-blue-500 text-white items-center">
          <h1 className='text-2xl mx-4'>Pairamid</h1>
        </header>
        <DailyView />
      </div>
    );
  }
}

export default App;
