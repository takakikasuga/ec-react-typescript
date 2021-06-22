import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"

// 機能のインポート
import { selectAdminItems, fetchAdminItemsAsync } from "../../features/items/adminItemsSlice"

// コンポーネントのインポート
import { AdminHeader } from "../organisums/header/AdminHeader"
import { TableHeaer } from "../organisums/adminTable/TableHeader"
import { TableRowContents } from "../organisums/adminTable/TableRowContents"

// 型のインポート
import { FetchAdminItems } from "../../types/admin/adminItems"

// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const AdminItems = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const adminItems: FetchAdminItems = useSelector(selectAdminItems)

  useEffect(() => {
    // 追加した商品一覧を取得する
    dispatch(fetchAdminItemsAsync())
  }, [])

  return (
    <div>
      <AdminHeader></AdminHeader>
      <h1>追加した商品一覧です。</h1>
      {!adminItems!.adminItems! ? "" :
        <ContainerPadding>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHeaer></TableHeaer>
              <TableBody>
                {adminItems!.adminItems!.map((item, index) => {
                  return (
                    <TableRowContents
                      key={index}
                      description={item.description}
                      imagePath={item.imagePath}
                      name={item.name}
                      price={item.price}
                      indexNum={index}
                      uniqueId={item.uniqueId}
                      id={item.id}
                    ></TableRowContents>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ContainerPadding>
      }
    </div>
  )
}


const ContainerPadding = styled.div`
  margin-top: 40px;
  padding:0 40px;
  margin-bottom: 32px;
`