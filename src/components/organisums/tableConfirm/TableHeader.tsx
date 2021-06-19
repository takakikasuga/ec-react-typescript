import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export const TableHeaer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>商品名</TableCell>
        <TableCell align="right">値段（税込）</TableCell>
        <TableCell align="right">個数</TableCell>
        <TableCell align="right">合計金額（税込）</TableCell>
      </TableRow>
    </TableHead>
  )
}
