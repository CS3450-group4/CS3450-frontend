import { useEffect, useState } from 'react';
import './App.css';
import TestApi from './components/test-api';

function App() {

  const [apiData, setApiData] = useState()
  useEffect(() => {
      fetch('http://localhost:8000/api/')
        .then((res) => res.json())
        .then((data) => setApiData(data))
  }, [])
  
  // form with two input fields, one for name, one for price
  return (
    <div className="App">
      {
        apiData && (
          <TestApi apiData={apiData} />
        )
      }
    </div>
  );
}

export default App;
