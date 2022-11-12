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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="customer/*" element={<CustomerView />} />
        <Route path="cashier/*" element={<CashierView />} />
        <Route path="barista" element={<BaristaView />} />
        <Route path="manager/*" element={<ManagerView />} />
        <Route path="unitTests/*" element={<UnitTests />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
