import { useEffect, useState } from 'react';
import './App.css';
import TestApi from './components/test-api';
import Login from './components/login-signup';

function App() {

  const [apiData, setApiData] = useState()
  useEffect(() => {
      fetch('http://localhost:8000/api/')
        .then((res) => res.json())
        .then((data) => setApiData(data))
  }, [])
  
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
