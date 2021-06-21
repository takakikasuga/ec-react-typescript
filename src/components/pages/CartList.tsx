import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// コンポーネント
import { Header } from '../organisums/header/Header'
import { DeleteButton } from '../atoms/button/DeleteButton'
import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { TableHeaer } from "../organisums/tableCart/TableHeader"
import { TableRowContents } from "../organisums/tableCart/TableRowContents"
import { selectLocalCartStrage } from "../../features/cartLists/localCartStrageSlice"

// 型のインポート
import { FetchOrder } from '../../types/order/order'
import { fetchItems } from '../../types/items/items'

// 各種機能のインポート
import { selectOrderUpdate } from '../../features/order/orderUpdateSlice'
import { deleteOrderItem, fetchOrderAsync, selectFetchOrder } from '../../features/order/fetchOrderSlice'
import { selectUserId } from '../../features/user/userSlice'
import { selectItems } from '../../features/items/itemsSlice'
import { statusZeroIdAsync } from '../../features/statusZeroId/statusZeroIdSlice'

// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const CartList = () => {
  const classes = useStyles();
  const dipatch = useDispatch()
  const history = useHistory()
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)
  const items: fetchItems[] = useSelector(selectItems)
  const orderUpdate = useSelector(selectOrderUpdate)
  const localCartStrage = useSelector(selectLocalCartStrage)
  // nullを「!」で明示的になくす
  const userId: string | null = useSelector(selectUserId)

  useEffect(() => {
    if (typeof userId === 'string') {
      // 現在のstatus0の注文情報IDを取得
      dipatch(statusZeroIdAsync(userId))
    }
    // 一回だけ発火して現在のstatus0注文情報を取得する
  }, [])

  useEffect(() => {
    // string型であることを保証する
    if (typeof userId === 'string') {
      // カートリストの中でstatusが0以外のの注文済情報をとってくる
      dipatch(fetchOrderAsync(userId))
    }
    // orderUpdateの配列状況が変更されるたびに発火して最新のカート情報をFirebaseから取得するようにする。
  }, [orderUpdate.length])


  const orderConfirm = () => {
    if (userId) {
      history.push('/orderConfirm')
    } else {
      alert("ヘッダーのログインよりアカウントへログインしてください。")
    }
  }
  console.log('アイテムリスト一覧', items)
  console.log(JSON.parse(localStorage.getItem("LOCAL_CART_LISTS") as string))
  return (
    <>
      <Header></Header>
      {/* ログイン状態かつFirebaseのstatus0の商品がない場合 */}
      {!fetchData.length && userId
        ? <h2>カートに商品情報はありません（ログイン状態かつFirebaseのstatus0の商品がない場合）</h2>
        // ログインしていない状態でカート情報がない場合
        : !localCartStrage.orderItems.length && !userId
          ? <h2>カートに商品情報はありません（ ログインしていない状態でカート情報がない場合）</h2>
          // ログインしていない状態でローカルストレージに商品情報がある場合
          : localCartStrage.orderItems.length && !userId
            ?
            <>
              {console.log(localCartStrage, localCartStrage.orderItems)}
              <h2>ログインしていない状態でローカルストレージに商品情報がある場合</h2>
              <ContainerPadding>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHeaer></TableHeaer>
                    {localCartStrage.orderItems.map((row: any, index: number) => {
                      let imageObject = items.find((element) => {
                        return element.id === row.itemId
                      })
                      return (
                        <TableBody>
                          <TableRowContents row={row} indexNum={index} key={index} imagePath={imageObject?.imagePath}></TableRowContents>
                        </TableBody>
                      )
                    })}
                  </Table>
                </TableContainer>
                <span onClick={() => { orderConfirm() }}>
                  <PrimaryButton>注文確認画面へ</PrimaryButton>
                </span>
              </ContainerPadding>
            </>
            /* ログイン状態かつFirebaseのstatus0の商品がある場合*/
            :
            <>
              <h2>ログイン状態かつFirebaseのstatus0の商品がある場合</h2>
              <ContainerPadding>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHeaer></TableHeaer>
                    <TableBody>
                      {/* 商品idとfetchDataのitemIDが一致するオブジェクトを返却する */}
                      {fetchData.map((row: FetchOrder, index: number) => {
                        let imageObject = items.find((element) => {
                          return element.id === row.itemId
                        })
                        return (
                          <TableRowContents row={row} indexNum={index} key={index} imagePath={imageObject?.imagePath}></TableRowContents>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <span onClick={() => { orderConfirm() }}>
                  <PrimaryButton>注文確認画面へ</PrimaryButton>
                </span>
              </ContainerPadding>
            </>
      }
    </>
  );
}

const ContainerPadding = styled.div`
  padding:0 40px
`