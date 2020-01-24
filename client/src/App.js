import React from 'react';
import './App.css';
import Submission from './components/Submission';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <div className='container mt-3'>
          <Submission />
        </div>
      </header>
    </div>
  );
}

export default App;
