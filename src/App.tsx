import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Header } from './components/organisums/header/Header'
import { Admin } from './components/pages/Admin'
import firebase from 'firebase'

import { registerUserInfoAsync } from './features/user/userSlice'

function App() {
  const dispach = useDispatch()
  useEffect(() => {
    dispach(registerUserInfoAsync())
  }, [dispach])

  return (
    <div className="App">
      <Header></Header>
      <Admin></Admin>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
