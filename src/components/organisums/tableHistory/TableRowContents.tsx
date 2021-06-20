import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// コンポーネント
import noImage from "../../../noImage/noImage.png"

// 型のインポート
import { FetchOrder } from "../../../types/order/order"

// 各種機能のインポート
import { selectFetchOrder } from '../../../features/order/fetchOrderSlice'
import { selectUserId } from '../../../features/user/userSlice'
import { selectStatusZeroId } from '../../../features/statusZeroId/statusZeroIdSlice'
import { cancelOrderHistoryAsync } from '../../../features/order/orderHistorySlice'

// マテリアルUI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200
  },
});

// 現状propsの型定義方法の理解ができていない
export const TableRowContents = React.memo((props: any) => {
  const classes = useStyles();
  console.log(props)
  const { orderList, indexNum, imagePath, order } = props
  console.log(orderList, indexNum)
  const dispatch = useDispatch()
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!


  // 注文情報の削除のキャンセル
  const cancelOrder = (uniqueOrderId: string | undefined) => {
    // string型の保証
    if (typeof uniqueOrderId === "string") {
      if (window.confirm('本当にキャンセルしますか？')) {
        dispatch(cancelOrderHistoryAsync({ userId, uniqueOrderId }))
      }
    }

  }
  return (
    <TableRow  >
      <TableCell component="th" scope="row">
        {orderList.itemName}
        <CardMedia
          className={classes.media}
          image={imagePath ? imagePath : noImage}
          title="Contemplative Reptile"
        />
      </TableCell>
      <TableCell align="right">{orderList.itemPrice}</TableCell>
      <TableCell align="right">{orderList.itemCount}</TableCell>
      <TableCell align="right">{(orderList.itemPrice * orderList.itemCount).toLocaleString()}円（税込）</TableCell>
      {order.orderItems.length === (indexNum + 1)
        ? <TableCell align="right">{(order.totoalPrice).toLocaleString()}円（税込）</TableCell>
        : ""}
      {/* 発送済みまたはキャンセル済みまたはこの注文をキャンセルを場合分け */}
      <TableCell align="right">
        {order.orderItems.length === (indexNum + 1) && order.status !== 9
          ? <>
            <p>配達希望日：{order.orderDate}</p>
            <Button onClick={() => { cancelOrder(order.orderUniqueId) }} variant="contained">この注文をキャンセル</Button>

          </>
          : order.orderItems.length === (indexNum + 1) && order.status === 9
            ? <>
              <p>配達希望日：{order.orderDate}</p>
              <Button disabled={true} variant="contained">キャンセル済み</Button>
            </>
            : ""
        }
      </TableCell>
    </TableRow>
  )
})
