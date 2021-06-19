import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// 機能のインポート
import { selectUserId, selectUserName, loginUserAsync, signOutUserInfoAsync } from '../../../features/user/userSlice'
import { fetchItemsAsync } from '../../../features/items/itemsSlice'
import { deleteOrderItem, fetchOrderAsync, selectFetchOrder } from '../../../features/order/fetchOrderSlice'

// コンポーネント
import { SearchInput } from '../../atoms/search/SearchInput'


// 型のインポート
import { FetchOrder } from '../../../types/order/order'

// マテリアルUI
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    flexSpace: {
      justifyContent: 'space-around',
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    flexColum: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    margin: {
      marginRight: '10px',
    },
    fontHeaderSize: {
      fontSize: '9px'
    },
    positionRelative: {
      position: 'relative'
    },
    // カートに入れている商品数
    cartCount: {
      position: "absolute",
      backgroundColor: "yellow",
      width: "20px",
      height: "20px",
      borderRadius: "100%",
      color: "#000",
      left: "15px",
      top: "-25px"
    }
  }),
);

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector(selectUserId)
  const userName = useSelector(selectUserName)
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)

  const login = () => {
    console.log('login')
    dispatch(loginUserAsync())
  }
  const logout = () => {
    console.log('logout')
    dispatch(signOutUserInfoAsync())
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.flexSpace} >
          <Typography onClick={() => { history.push('/') }} className={classes.title} variant="h6" noWrap>
            EC-Rakuraku-Rakuten
          </Typography>
          <SearchInput></SearchInput>
          <div className={classes.flex}>
            {!userName ? <Typography className={classes.margin}>ようこそ ゲスト さん</Typography> : <Typography className={classes.margin}>ようこそ {userName} さん</Typography>}
            {!userId ?
              <span onClick={login} className={classes.flexColum}>
                <ExitToAppIcon></ExitToAppIcon>
                <span className={classes.fontHeaderSize}>ログイン</span>
              </span>
              :
              <>

                <span onClick={() => { history.push('/cartlist') }} className={classes.flexColum + " " + classes.margin + " " + classes.positionRelative}>
                  <p className={classes.cartCount}>{fetchData.length}</p>
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <span className={classes.fontHeaderSize}>カート</span>
                </span>
                <span className={classes.flexColum + " " + classes.margin}>
                  <StarIcon></StarIcon>
                  <span className={classes.fontHeaderSize}>お気に入り</span>
                </span>
                <span onClick={() => { history.push('/orderHistory') }} className={classes.flexColum + " " + classes.margin}>
                  <ViewListIcon></ViewListIcon>
                  <span className={classes.fontHeaderSize}>注文履歴</span>
                </span>
                <span onClick={logout} className={classes.flexColum}>
                  <NotInterestedIcon></NotInterestedIcon>
                  <span className={classes.fontHeaderSize}>ログアウト</span>
                </span>
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}