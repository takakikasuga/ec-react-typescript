import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const TableHeaer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>商品ID</TableCell>
        <TableCell>商品名 / 商品画像</TableCell>
        <TableCell align='left'>商品詳細</TableCell>
        <TableCell align='left'>Mサイズの値段（税抜き）</TableCell>
        <TableCell align='left'>Lサイズの値段（税抜き）</TableCell>
        <TableCell align='left'>削除</TableCell>
      </TableRow>
    </TableHead>
  );
};
