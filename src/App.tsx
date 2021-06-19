import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from './features/user/userSlice'

// コンポーネントのインポート
import './App.css';
import { Home } from './components/pages/Home'
import { Deatail } from './components/pages/Detail'
// import { Admin } from './components/pages/Admin'
import { CartList } from './components/pages/CartList'
import { OrderConfirm } from './components/pages/OrderConfirm'
import { OrderHistory } from './components/pages/OrderHistory'

// 機能のインポート
import { registerUserInfoAsync } from './features/user/userSlice'
import { fetchItemsAsync } from './features/items/itemsSlice'
import { statusZeroIdAsync } from './features/statusZeroId/statusZeroIdSlice'
import { fetchOrderAsync } from './features/order/fetchOrderSlice'
import { suggestItemsAsync } from './features/suggest/suggestSlice'

function App() {
  const dispach = useDispatch()
  const userId = useSelector(selectUserId)
  useEffect(() => {
    dispach(registerUserInfoAsync())
    dispach(fetchItemsAsync())
    dispach(suggestItemsAsync())
  }, [dispach])

  useEffect(() => {
    if (userId) {
      dispach(fetchOrderAsync(userId))
      dispach(statusZeroIdAsync(userId))
    }
  }, [userId])

  return (
    <div className="App">
      <Router>
        <Link to='/cartlist'>ショッピングカート</Link><br />
        <Link to='/orderConfirm'>注文確認画面</Link><br />
        <Link to='/orderHistory'>注文履歴画面</Link><br />
        <Link to='/'>トップページ</Link><br />
        <Switch>
          <Route exact path="/detail/:id" component={Deatail} />
          <Route exact path="/orderHistory" component={OrderHistory} />
          <Route exact path="/cartList" component={CartList} />
          <Route exact path="/orderConfirm" component={OrderConfirm} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
