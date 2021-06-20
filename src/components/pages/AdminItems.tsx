import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"

// 機能のインポート
import { selectItems, fetchItemsAsync } from "../../features/items/itemsSlice"

// コンポーネントのインポート
import { AdminHeader } from "../organisums/header/AdminHeader"
import { TableHeaer } from "../organisums/adminTable/TableHeader"
import { TableRowContents } from "../organisums/adminTable/TableRowContents"

// 型のインポート
import { fetchItems } from "../../types/items/items"

// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const AdminItems = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const items: fetchItems[] = useSelector(selectItems)


  useEffect(() => {
    // 追加した商品一覧を取得する
    dispatch(fetchItemsAsync())
  }, [])

  return (
    <div>
      <AdminHeader></AdminHeader>
      <h1>追加した商品一覧です。</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHeaer></TableHeaer>
          <TableBody>
            {items.map((item, index) => (
              <TableRowContents
                key={index}
                description={item.description}
                imagePath={item.imagePath}
                name={item.name}
                price={item.price}
                indexNum={index}
              ></TableRowContents>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const ContainerPadding = styled.div`
  padding:0 40px
`