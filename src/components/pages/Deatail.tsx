import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

// スライサーよりアイテムデータを取得
import { selectItems } from '../../features/items/itemsSlice'
import { selectItemPrice } from '../../features/itemPrice/itemPrice'
import { selectItemCount } from '../../features/itemCount/itemCount'


// コンポーネント
import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { RadioButton } from '../organisums/radio/RadioButton'
import { ItemCount } from '../organisums/count/ItemCount'

// 型のインポート
import { Params } from '../../types/params/parameter'
import { fetchItems } from '../../types/items/items'

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
  const items: Array<fetchItems> = useSelector(selectItems)
  const itemPrice: number = useSelector(selectItemPrice)
  const itemCount: number = useSelector(selectItemCount)
  const { id }: Params = useParams()

  console.log(id)
  const itemDetail = items.filter((item: fetchItems) => {
    console.log(item)
    return item.id === Number(id)
  })
  console.log(id)
  console.log(itemDetail)
  return (
    <div>
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
      <PrimaryButton>カートに追加</PrimaryButton>
    </div>
  )
}
