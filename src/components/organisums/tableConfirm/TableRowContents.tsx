import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { DeleteButton } from '../../atoms/button/DeleteButton';
import noImage from '../../../noImage/noImage.png';

// 型のインポート
import { FetchOrder } from '../../../types/order/order';

// 各種機能のインポート
import {
  deleteOrderItem,
  deleteOrderAsync,
  selectFetchOrder,
} from '../../../features/order/fetchOrderSlice';
import { selectUserId } from '../../../features/user/userSlice';
import { selectStatusZeroId } from '../../../features/statusZeroId/statusZeroIdSlice';

// マテリアルUI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200,
  },
});

// 現状propsの型定義方法の理解ができていない
export const TableRowContents = React.memo((props: any) => {
  const classes = useStyles();
  const { row, indexNum, imagePath } = props;
  const dipatch = useDispatch();
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder);
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!;
  const statusZeroId = useSelector(selectStatusZeroId);

  return (
    <TableRow>
      <TableCell component='th' scope='row' style={{ width: '240px' }}>
        {row.itemName}
        <CardMedia
          className={classes.media}
          // 商品情報が削除されていた場合のnoImage
          image={imagePath ? imagePath : noImage}
          title='Contemplative Reptile'
        />
      </TableCell>
      <TableCell align='right'>
        {Number(row.itemPrice).toLocaleString()}円
      </TableCell>
      <TableCell align='right'>{row.itemCount}個</TableCell>
      <TableCell align='right'>
        {Number(row.itemPrice * row.itemCount).toLocaleString()}円
      </TableCell>
    </TableRow>
  );
});
