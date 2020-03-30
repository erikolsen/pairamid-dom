import React from 'react';
import DailyView from './components/DailyView'
import logo from './assets/pairamid-logo.png'

class App extends React.Component {
  render(){
    return (
      <div className="">
        <header className="flex bg-blue-100 text-white items-center">
          <img src={logo} alt='logo' className='mx-4'/>
        </header>
        <DailyView />
      </div>
    );
  }
}

export default App;
