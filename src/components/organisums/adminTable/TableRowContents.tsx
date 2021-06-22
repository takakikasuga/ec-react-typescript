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
import { updateAdminItemsAsync } from "../../../features/items/adminItemsSlice"

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
  descriptionWidth: {
    maxWidth: "300px"
  }
});

// 現状propsの型定義方法の理解ができていない
export const TableRowContents = React.memo((props: any) => {
  const classes = useStyles();
  console.log(props)
  const { description, imagePath, name, price, uniqueId, id } = props
  const dipatch = useDispatch()
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!
  const statusZeroId = useSelector(selectStatusZeroId)

  console.log("商品情報のユニークなID", uniqueId)

  // 注文情報の削除
  const deleteAdminItem = (uniqueId: string) => {
    // ユニークなIDを持たせてアップデートさせる
    if (window.confirm("本当に商品一覧から削除しますか？？")) {
      dipatch(updateAdminItemsAsync(uniqueId))
    }
  }
  return (
    <TableRow>
      <TableCell align="right">{id}</TableCell>
      <TableCell component="th" scope="row" style={{ width: '240px' }}>
        {name}
        <CardMedia
          className={classes.media}
          image={imagePath}
          title="Contemplative Reptile"
        />
      </TableCell>
      <TableCell className={classes.descriptionWidth} align="left">{description}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{(price.m)}</TableCell>
      <TableCell align="left">{(price.l)}</TableCell>
      <TableCell align="left">
        <span onClick={() => { deleteAdminItem(uniqueId) }}>
          <DeleteButton></DeleteButton>
        </span>
      </TableCell>
    </TableRow>
  )
})
