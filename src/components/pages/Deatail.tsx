import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

// スライサーよりアイテムデータを取得
import { selectItems } from '../../features/items/itemsSlice'
import { selectItemPrice } from '../../features/itemPrice/itemPriceSlice'
import { selectItemCount } from '../../features/itemCount/itemCountSlice'
import { addOrderAsync, selectAddOrder } from '../../features/order/orderSlice'
import { selectUserId } from '../../features/user/userSlice'
import { selectFetchOrder } from '../../features/order/fetchOrderSlice'
import { orderUpdateAsync } from '../../features/order/orderUpdateSlice'


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

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)
  const { id }: Params = useParams()

  const itemDetail = items.filter((item: fetchItems) => {
    console.log(item)
    return item.id === Number(id)
  })

  const addOrder = (path: string) => {
    let addOrder: any = {
      userId: userId,
      orderInfo: {
        orderItems: [{
          itemCount: itemCount,
          itemId: itemDetail[0].id,
          itemPrice: itemPrice,
          uniqueItemId: ''
        }],
      },
      status: 0
    }
    console.log(userId)
    console.log(fetchData.length)
    // statusが0のものが存在するか否かでの場合わけ（新規or追加）
    if (!fetchData.length) {
      dispatch(addOrderAsync(addOrder))
    } else {
      dispatch(orderUpdateAsync(addOrder))
    }
    // カートリストへ画面遷移
    history.push(path)
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
              <img src={detail!.imagePath!} alt="" />
              <p>{detail.description}</p>
            </Paper>
            <div>
              <RadioButton detail={detail}></RadioButton>
              <ItemCount>数量を選択</ItemCount>
            </div>
            <div>
              <h4>合計金額</h4>
              <p>{(itemPrice * itemCount).toLocaleString()}円（税込）</p>
            </div>
          </Grid>
        </Grid>
      ))}
      <span onClick={() => { addOrder(`/cartList`) }}>
        <PrimaryButton>カートに追加</PrimaryButton>
      </span>
    </>
  )
}
