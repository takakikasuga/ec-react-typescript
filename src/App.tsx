import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { selectItems } from './features/items/itemsSlice'
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Home } from './components/pages/Home'
import { Deatail } from './components/pages/Deatail'
import { Admin } from './components/pages/Admin'

import { registerUserInfoAsync } from './features/user/userSlice'
import { fetchItemsAsync } from './features/items/itemsSlice'

function App() {
  const dispach = useDispatch()
  useEffect(() => {
    dispach(registerUserInfoAsync())
    dispach(fetchItemsAsync())
  }, [dispach])

  return (
    <div className="App">

      {/* <Admin></Admin> */}
      {/* <Items></Items> */}
      <Router>
        <Switch>
          <Route exact path="/detail/:id" component={Deatail} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
