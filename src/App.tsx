import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaristaView from './components/main-view-components/barista-view';
import CashierView from './components/main-view-components/cashier-view';
import ManagerView from './components/main-view-components/manager-view';
import CustomerView from './components/main-view-components/customer-view';
import UnitTests from './components/main-view-components/unit-tests';
import Login from './components/login-signup';


function App() {
  const[created, setCreated] = useState(false)

  useEffect(() => {
    if(!created && (window.sessionStorage.getItem("manCreated") !== "true")) createMan()
    // createMan()
  }, [])

  async function createMan() {
    await fetch('http://localhost:8000/api/create_user/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        "username": "manager",
        "first_name": "manager",
        "last_name": "bossman",
        "password": "password",
        "userinfo": {
            "authLevel": [
                0, 1, 2, 3
            ],
            "balance": 5955,
            "actingLevel": 3,
            "hoursWorked": 0
        }
    }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        window.sessionStorage.setItem("manCreated", "true")
        setCreated(true)
      }).catch((err) => console.log(err))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="customer/*" element={<CustomerView />} />
        <Route path="cashier/*" element={<CashierView />} />
        <Route path="barista/*" element={<BaristaView />} />
        <Route path="manager/*" element={<ManagerView />} />
        <Route path="unitTests/*" element={<UnitTests />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
