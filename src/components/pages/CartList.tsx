import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// コンポーネント
import { Header } from '../organisums/header/Header'
import { DeleteButton } from '../atoms/button/DeleteButton'

// 型のインポート
import { FetchOrder } from '../../types/order/order'

import { selectOrderUpdate } from '../../features/order/orderUpdateSlice'
import { selectCartLists } from '../../features/cartLists/cartListsSlice'
import { deleteOrderItem, deleteOrderAsync, fetchOrderAsync, selectFetchOrder } from '../../features/order/fetchOrderSlice'
import { selectUserId } from '../../features/user/userSlice'
import { selectStatusZeroId, statusZeroIdAsync } from '../../features/statusZeroId/statusZeroIdSlice'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const CartList = () => {
  const classes = useStyles();
  const dipatch = useDispatch()
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)
  const orderUpdate = useSelector(selectOrderUpdate)
  const statusZeroId = useSelector(selectStatusZeroId)
  const userId: string | null = useSelector(selectUserId)

  useEffect(() => {
    // string型であることを保証する
    if (typeof userId === 'string') {
      // カートリストの中でstatusが0の注文情報をとってくる
      dipatch(fetchOrderAsync(userId))
      // 注文情報の固有のIDを取得する
      dipatch(statusZeroIdAsync(userId))
      console.log('useEffectでfetchOrderAsyncが発火します')
    }
    // orderUpdateの配列状況が変更されるたびに発火して最新のカート情報をFirebaseから取得するようにする。
  }, [orderUpdate.length])

  const deleteCart = (index: number) => {
    console.log('deleteCartが発火')
    console.log(index)
    console.log(fetchData)
    dipatch(deleteOrderItem(index))
    console.log(statusZeroId)
    console.log(fetchData)
    // 直接参照しているstoreのデータを削除することができないのでコピー
    const updateFetchData = [...fetchData]
    // string型であることを保証する
    if (typeof userId === 'string') {
      updateFetchData.splice(index, 1)
      dipatch(deleteOrderAsync({ userId, statusZeroId, updateFetchData }))
    }
  }
  console.log('fetchOrder.length', fetchData.length)

  return (
    <>
      <Header></Header>
      {!fetchData.length ? <h2>カートに商品情報はありません</h2> :
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>商品名</TableCell>
                <TableCell align="right">値段（税込）</TableCell>
                <TableCell align="right">個数</TableCell>
                <TableCell align="right">合計金額（税込）</TableCell>
                <TableCell align="right">
                  削除
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchData.map((row: FetchOrder, index: number) => (
                <TableRow key={index}>
                  {console.log('発火しています')}
                  <TableCell component="th" scope="row">
                    {/* {row.name} */}
                  </TableCell>
                  <TableCell align="right">{row.itemPrice}</TableCell>
                  <TableCell align="right">{row.itemCount}</TableCell>
                  <TableCell align="right">{((row.itemPrice) * (row.itemCount)).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <span onClick={() => { deleteCart(index) }}>
                      <DeleteButton></DeleteButton>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}