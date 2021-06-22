import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// コンポーネント
import { Header } from '../organisums/header/Header'
import { TableHeaer } from '../organisums/tableHistory/TableHeader'
import { TableRowContents } from '../organisums/tableHistory/TableRowContents'

// 機能
import { orderHistoryAsync, selectOrderHistory, cancelOrderHistoryAsync } from '../../features/order/orderHistorySlice'
import { selectUserId } from '../../features/user/userSlice'
import { selectItems } from '../../features/items/itemsSlice'

// 型のインポート
import { FetchHistory, FetchObject, OrderItems } from '../../types/history/orderHistory'
import { fetchItems } from '../../types/items/items'

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
  const orderHistory: FetchHistory = useSelector(selectOrderHistory)!
  const items: fetchItems[] = useSelector(selectItems)

  useEffect(() => {
    // userIdを取得している場合に非同期通信を行う
    if (userId) {
      // 注文情報からstatus = 0 以外の情報を取得する
      dispatch(orderHistoryAsync(userId))
    }
    // stateのuserIdが変化するたびに取得する
  }, [userId])

  return (
    <>
      <Header></Header>
      <h1>注文履歴画面です</h1>
      {!orderHistory.length ? <h2>注文履歴がございません。</h2> :
        <ContainerPadding>
          <TableContainer component={Paper}>
            {
              orderHistory.map((order: FetchObject, index: number) => {
                return (
                  <Table className={classes.table} size="small" aria-label="a dense table" style={{ marginTop: "30px" }} key={index}>
                    <TableHeaer></TableHeaer>
                    <TableBody style={{ padding: "30px" }}>
                      {order.orderItems.map((orderList: OrderItems, index: number) => {
                        let imageObject = items.find((element) => {
                          return element.id === orderList.itemId
                        })
                        return (
                          <TableRowContents order={order} orderList={orderList} indexNum={index} key={index} imagePath={imageObject?.imagePath} />
                        )
                      })}
                    </TableBody>
                  </Table>
                )
              })}
          </TableContainer>
        </ContainerPadding>
      }
    </>
  )
}

const ContainerPadding = styled.div`
  padding:0 40px
`