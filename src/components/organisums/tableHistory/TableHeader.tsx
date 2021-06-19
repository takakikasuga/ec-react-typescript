import React from 'react'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export const TableHeaer = () => {
  return (
    <TableHead >
      <TableRow>
        <TableCell style={{ fontWeight: "bold" }}>注文情報</TableCell>
        <TableCell align="right" style={{ fontWeight: "bold" }}>値段（税込）</TableCell>
        <TableCell align="right" style={{ fontWeight: "bold" }}>商品個数</TableCell>
        <TableCell align="right" style={{ fontWeight: "bold" }}>商品合計</TableCell>
        <TableCell align="right" style={{ fontWeight: "bold" }}>商品総合計</TableCell>
        <TableCell align="right" style={{ fontWeight: "bold" }}>注文キャンセル</TableCell>
      </TableRow>
    </TableHead>
  )
}
