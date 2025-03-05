import React from 'react';
import './App.scss';
import { Outlet } from 'react-router'
import Header from './components/shared/header/Header'

function App() {

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
