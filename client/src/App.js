import React from 'react';
import './App.css';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mt-3">
          <Link to="/">
            <FontAwesomeIcon icon={faUserSecret} color="#fec02f" size="3x" />
          </Link>
        </div>
        <div className='container mt-3'>
          <Search />
        </div>
      </header>
    </div>
  );
}

export default App;
