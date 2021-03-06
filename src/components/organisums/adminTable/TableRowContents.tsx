import React from 'react';
import { useDispatch } from 'react-redux';

// コンポーネント
import { DeleteButton } from '../../atoms/button/DeleteButton';

// 各種機能のインポート
import { updateAdminItemsAsync } from '../../../features/items/adminItemsSlice';

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
  descriptionWidth: {
    maxWidth: '300px',
  },
});

// 現状propsの型定義方法が理解ができていない
export const TableRowContents = React.memo((props: any) => {
  const classes = useStyles();
  const { description, imagePath, name, price, uniqueId, id } = props;
  const dipatch = useDispatch();

  // 注文情報の削除
  const deleteAdminItem = (uniqueId: string) => {
    // ユニークなIDを持たせてアップデートさせる
    if (window.confirm('本当に商品一覧から削除しますか？？')) {
      dipatch(updateAdminItemsAsync(uniqueId));
    }
  };
  return (
    <TableRow>
      <TableCell align='right'>{id}</TableCell>
      <TableCell component='th' scope='row' style={{ width: '240px' }}>
        {name}
        <CardMedia
          className={classes.media}
          image={imagePath}
          title='Contemplative Reptile'
        />
      </TableCell>
      <TableCell className={classes.descriptionWidth} align='left'>
        {description}
      </TableCell>
      <TableCell align='left'>{Number(price.m).toLocaleString()}円</TableCell>
      <TableCell align='left'>{Number(price.l).toLocaleString()}円</TableCell>
      <TableCell align='left'>
        <span
          onClick={() => {
            deleteAdminItem(uniqueId);
          }}>
          <DeleteButton></DeleteButton>
        </span>
      </TableCell>
    </TableRow>
  );
});
