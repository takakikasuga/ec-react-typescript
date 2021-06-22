import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'


// スライサーよりアイテムデータを取得
import { selectItems } from '../../features/items/itemsSlice'
import { selectItemPrice } from '../../features/itemPrice/itemPriceSlice'
import { selectItemCount } from '../../features/itemCount/itemCountSlice'
import { addOrderAsync, selectAddOrder } from '../../features/order/orderSlice'
import { selectUserId } from '../../features/user/userSlice'
import { selectFetchOrder } from '../../features/order/fetchOrderSlice'
import { orderUpdateAsync } from '../../features/order/orderUpdateSlice'
import { setLocalCartStrage, selectLocalCartStrage } from "../../features/cartLists/localCartStrageSlice"

// コンポーネント
import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { RadioButton } from '../organisums/radio/RadioButton'
import { ItemCount } from '../organisums/count/ItemCount'
import { Header } from '../organisums/header/Header'

// 型のインポート
import { Params } from '../../types/params/parameter'
import { fetchItems } from '../../types/items/items'
import { AddOrder, OrderUpdate } from '../../types/order/order'
import { FetchOrder } from '../../types/order/order'
import { firebaseOrderInfo } from '../../types/order/firebaseOrderInfo'

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { display } from '@material-ui/system';
import { CollectionsOutlined } from '@material-ui/icons'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingRight: "30px",
      paddingLeft: "30px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginBottom: "32px",
      color: theme.palette.text.secondary,
    },
  }),
);

export const Deatail = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const items: Array<fetchItems> = useSelector(selectItems)
  const itemPrice: number = useSelector(selectItemPrice)
  const itemCount: number = useSelector(selectItemCount)
  const userId: string | null = useSelector(selectUserId)
  const fetchData: any = useSelector(selectFetchOrder)
  const localCartStrage: any = useSelector(selectLocalCartStrage)
  const { id }: Params = useParams()

  // 詳細画面に一致する商品を抽出する
  const itemDetail = items.filter((item: fetchItems) => {
    return item.id === Number(id)
  })

  const addOrder = (path: string) => {
    if (itemPrice === 0) {
      alert(`${itemDetail[0].name}のサイズを選択してください。`)
    } else if (itemCount === 0) {
      alert(`${itemDetail[0].name}の数量を選択してください。`)
    } else {
      let addOrder: firebaseOrderInfo = {
        userId: userId!,
        orderInfo: {
          orderItems: [{
            itemId: itemDetail[0].id!,
            itemCount: itemCount,
            itemName: itemDetail[0].name!,
            itemPrice: itemPrice,
            uniqueItemId: ''
          }],
          status: 0
        },
      }
      // ログインがされている状態であればFirebaseを用いた非同期通信を行い、カート情報を追加する
      if (userId) {
        // statusが0のものが存在するか否かでの場合わけ（新規or追加）
        if (!fetchData.length) {
          dispatch(addOrderAsync(addOrder))
        } else {
          dispatch(orderUpdateAsync(addOrder))
        }
        // ログインがされていない場合は、ローカルストレージに商品を保存する
      } else {
        // Firebaseにおける一意のidを作成する代わりに今の日付で作成、追加する
        let id = new Date().getTime().toString();
        // 現状の情報に一意のId（uniqueItemId）を追加
        addOrder.orderInfo.orderItems[0].uniqueItemId = id
        dispatch(setLocalCartStrage(addOrder))
      }

      // カートリストへ画面遷移z
      history.push(path)
    }
  }

  return (
    <>
      <Header></Header>
      <h1>Detailです</h1>
      {itemDetail.map((detail: fetchItems, index: number) => (
        <Grid container spacing={3} className={classes.root} key={index}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h3>{detail.name}</h3>
              <ImageWrapper src={detail!.imagePath!} alt="" />
              <p>{detail.description}</p>
            </Paper>
            <FlexItems>
              <RadioButton detail={detail}></RadioButton>
              <ItemCount>数量を選択</ItemCount>
            </FlexItems>
            <div>
              <h4>合計金額</h4>
              <p>{(itemPrice * itemCount)}円（税込）</p>
            </div>
          </Grid>
        </Grid>
      ))}
      <WrapperButton onClick={() => { addOrder(`/cartList`) }}>
        <PrimaryButton>カートに追加</PrimaryButton>
      </WrapperButton>
    </>
  )
}


const WrapperButton = styled.span`
  text-align: center;
`
const ImageWrapper = styled.img`
  display: block;
  object-fit: cover;
  width: 80%;
  margin:0 auto;
`
const FlexItems = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
`


