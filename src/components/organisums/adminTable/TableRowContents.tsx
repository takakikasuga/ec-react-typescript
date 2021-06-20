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
export const TableRowContents = React.memo((props: any) => {
  const classes = useStyles();
  console.log(props)
  const { description, imagePath, name, price, indexNum } = props
  const dipatch = useDispatch()
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!
  const statusZeroId = useSelector(selectStatusZeroId)



  // 注文情報の削除
  const deleteCart = (indexNum: number) => {
    dipatch(deleteOrderItem(indexNum))
    // 直接参照しているstoreのデータを削除することができないのでコピー
    const updateFetchData = [...fetchData]
    // string型であることを保証する
    if (typeof userId === 'string') {
      updateFetchData.splice(indexNum, 1)
      dipatch(deleteOrderAsync({ userId, statusZeroId, updateFetchData }))
    }
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row" style={{ width: '240px' }}>
        {name}
        <CardMedia
          className={classes.media}
          image={imagePath}
          title="Contemplative Reptile"
        />
      </TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{(price.m).toLocaleString()}</TableCell>
      <TableCell align="right">{(price.l).toLocaleString()}</TableCell>
      <TableCell align="right">
        <span onClick={() => { deleteCart(indexNum) }}>
          <DeleteButton></DeleteButton>
        </span>
      </TableCell>
    </TableRow>
  )
})
