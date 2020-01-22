import React from 'react';
import './App.css';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class='container mt-3'>
          <Search/>
        </div>
      </header>
    </div>
  );
}

export default App;
