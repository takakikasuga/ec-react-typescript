import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// コンポーネント
import { DeleteButton } from '../../atoms/button/DeleteButton'

// 型のインポート
import { FetchOrder } from "../../../types/order/order"

// 各種機能のインポート
import { deleteOrderItem, deleteOrderAsync, selectFetchOrder } from '../../../features/order/fetchOrderSlice'
import { selectUserId } from '../../../features/user/userSlice'
import { selectStatusZeroId } from '../../../features/statusZeroId/statusZeroIdSlice'
import { deleteLocalCartStrage } from "../../../features/cartLists/localCartStrageSlice"

// NoImageのインポート
import noImage from "../../../noImage/noImage.png"

// マテリアルUI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200
  },
});

// 現状propsの型定義方法の理解ができていない
export const TableRowContents = (props: any) => {
  const classes = useStyles();
  const { row, indexNum, imagePath } = props
  const dipatch = useDispatch()
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!
  const statusZeroId = useSelector(selectStatusZeroId)

  // 注文情報の削除
  const deleteCart = (indexNum: number) => {
    if (window.confirm("本当に削除しますか？？")) {
      // ログインしている状態であれば以下の処理を行う
      if (userId) {
        dipatch(deleteOrderItem(indexNum))
        // 直接参照しているstoreのデータを削除することができないのでコピー
        const updateFetchData = [...fetchData]
        // string型であることを保証する
        if (typeof userId === 'string') {
          updateFetchData.splice(indexNum, 1)
          dipatch(deleteOrderAsync({ userId, statusZeroId, updateFetchData }))
        }
        // ログインしている状態でなければ以下の処理を行う
      } else {
        dipatch(deleteLocalCartStrage(indexNum))
      }
    }
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row" style={{ width: '240px' }}>
        {row.itemName}
        <CardMedia
          className={classes.media}
          // 管理者が消してしまった商品についてはnoImageを採用
          image={imagePath ? imagePath : noImage}
          title="Contemplative Reptile"
        />
      </TableCell>
      <TableCell align="right">{Number(row.itemPrice).toLocaleString()}円</TableCell>
      <TableCell align="right">{row.itemCount}個</TableCell>
      <TableCell align="right">{Number((row.itemPrice) * (row.itemCount)).toLocaleString()}円</TableCell>
      <TableCell align="right">
        <span onClick={() => { deleteCart(indexNum) }}>
          <DeleteButton></DeleteButton>
        </span>
      </TableCell>
    </TableRow>
  )
}
