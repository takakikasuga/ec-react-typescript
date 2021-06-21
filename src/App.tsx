import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from './features/user/userSlice'

import { Provider } from 'react-redux';
// import { store } from './store/reduxStore';

// 管理者IDのインポート
import { AdminIdTest } from "./admin/admin"
// / 型のインポート
import { FetchOrder } from "./types/order/order"

// コンポーネントのインポート
import './App.css';
import { Home } from './components/pages/Home'
import { Deatail } from './components/pages/Detail'
import { Admin } from './components/pages/Admin'
// import { Admin } from './components/pages/Admin'
import { CartList } from './components/pages/CartList'
import { OrderConfirm } from './components/pages/OrderConfirm'
import { OrderHistory } from './components/pages/OrderHistory'
import { AdminItems } from './components/pages/AdminItems'

// 機能のインポート
import { registerUserInfoAsync } from './features/user/userSlice'
import { fetchItemsAsync } from './features/items/itemsSlice'
import { statusZeroIdAsync } from './features/statusZeroId/statusZeroIdSlice'
import { fetchOrderAsync } from './features/order/fetchOrderSlice'
import { suggestItemsAsync } from './features/suggest/suggestSlice'
import { selectFetchOrder } from "./features/order/fetchOrderSlice"

function App() {
  const dispach = useDispatch()
  const history = useHistory()
  const userId = useSelector(selectUserId)
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)

  useEffect(() => {
    dispach(registerUserInfoAsync())
  }, [])


  useEffect(() => {
    dispach(fetchItemsAsync())
    dispach(suggestItemsAsync())
    // if (userId) {
    //   // 管理者IDと一致しない場合
    //   if (userId !== AdminIdTest) {

    //   }
    // }
  }, [dispach, userId])

  useEffect(() => {
    if (userId) {
      // 管理者IDと一致しない場合
      if (userId !== AdminIdTest) {
        dispach(fetchOrderAsync(userId))
      }
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      // 管理者IDと一致しない場合
      if (userId !== AdminIdTest) {
        dispach(statusZeroIdAsync(userId))
      }
    }
  }, [userId, fetchData.length])

  return (
    // <Provider store={store}>
    <div className="App">
      <Router>
        <Link to='/cartlist'>ショッピングカート</Link><br />
        <Link to='/orderConfirm'>注文確認画面</Link><br />
        <Link to='/orderHistory'>注文履歴画面</Link><br />
        <Link to='/'>トップページ</Link><br />
        <Link to='/admin'>アドミン</Link><br />
        <Link to='/adminItems'>アドミンアイテム</Link><br />
        <Switch>
          <Route exact path="/detail/:id" component={Deatail} />
          <Route exact path="/adminItems" component={AdminItems} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/orderHistory" component={OrderHistory} />
          <Route exact path="/cartList" component={CartList} />
          <Route exact path="/orderConfirm" component={OrderConfirm} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
    // </Provider>
  );
}

export default App;
