import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export const TableHeaer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>商品名</TableCell>
        <TableCell>商品画像</TableCell>
        <TableCell align="right">商品詳細</TableCell>
        <TableCell align="right">Mサイズの値段（税抜き）</TableCell>
        <TableCell align="right">Lサイズの値段（税抜き）</TableCell>
        <TableCell align="right">
          削除
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
