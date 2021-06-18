import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// コンポーネント
import { Header } from '../organisums/header/Header'

// 機能
import { orderHistoryAsync, selectOrderHistory, cancelOrderHistoryAsync, cancelOrderStatus } from '../../features/order/orderHistorySlice'
import { selectUserId } from '../../features/user/userSlice'

// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!
  const orderHistory: any = useSelector(selectOrderHistory)!
  console.log(orderHistory)
  // const [flag, setFlag] = useState<boolean>(false)
  // const changeFlag = () => {
  //   setFlag(!flag)
  // }

  useEffect(() => {
    // userIdを取得している場合に非同期通信を行う
    if (userId) {
      // 注文情報からstatus = 0 以外の情報を取得する
      dispatch(orderHistoryAsync(userId))
    }
    // stateのuserIdが変化するたびに取得する
  }, [userId])

  const cancelOrder = (uniqueOrderId: string) => {
    if (window.confirm('本当にキャンセルしますか？')) {

      // storeのstateをコピーしていく
      let copyOrderHistory = [...orderHistory]

      dispatch(cancelOrderHistoryAsync({ userId, uniqueOrderId, copyOrderHistory }))
    }
  }

  return (
    <>
      <Header></Header>
      <h1>注文履歴画面です</h1>
      <TableContainer component={Paper}>
        {!orderHistory.length ? "" : orderHistory.map((order: any, index: number) => {
          return (
            <Table className={classes.table} size="small" aria-label="a dense table" style={{ marginTop: "30px" }} key={order.orderUniqueId}>
              <TableHead >
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>注文情報</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>値段（税込）</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>商品個数</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>商品合計</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>商品総合計</TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>注文キャンセル</TableCell>
                </TableRow>
              </TableHead>
              <TableBody key={index} style={{ padding: "30px" }}>
                {console.log(order)}
                {order.orderItems.map((orderList: any, index: number) => (
                  <TableRow key={orderList.uniqueItemId} >
                    <TableCell component="th" scope="row">
                      {orderList.itemName}
                    </TableCell>
                    <TableCell align="right">{orderList.itemPrice}</TableCell>
                    <TableCell align="right">{orderList.itemCount}</TableCell>
                    <TableCell align="right">{(orderList.itemPrice * orderList.itemCount).toLocaleString()}円（税込）</TableCell>
                    {order.orderItems.length === (index + 1)
                      ? <TableCell align="right">{(order.totoalPrice).toLocaleString()}円（税込）</TableCell>
                      : ""}
                    {/* 発送済みまたはキャンセル済みまたはこの注文をキャンセルを場合分け */}
                    <TableCell align="right">
                      {order.orderItems.length === (index + 1) && order.status !== 9
                        ? <Button onClick={() => { cancelOrder(order.orderUniqueId) }} variant="contained">この注文をキャンセル</Button>
                        : order.orderItems.length === (index + 1) && order.status === 9
                          ? <Button disabled={true} variant="contained">キャンセル済み</Button>
                          : ""
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        })}

      </TableContainer>
    </>
  )
}
