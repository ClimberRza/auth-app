import React, { createContext } from 'react';
import './App.scss';
import { Outlet } from 'react-router'
import Header from './components/shared/header/Header'

interface IAppContext {
  isLoggedIn: boolean
  setIsLoggedIn: Function
}

export const appContext = createContext<IAppContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <appContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn
    }}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </appContext.Provider>
  );
}

export default App;
