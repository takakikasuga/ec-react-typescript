import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// 機能のインポート
import { selectUserId, selectUserName, loginUserAsync, signOutUserInfoAsync } from '../../../features/user/userSlice'
import { fetchItemsAsync, selectItems, searchItemsAsync } from '../../../features/items/itemsSlice'
import { deleteOrderItem, fetchOrderAsync, selectFetchOrder } from '../../../features/order/fetchOrderSlice'
import { selectSuggestItems } from '../../../features/suggest/suggestSlice'

// コンポーネント
import { SearchInput } from '../../atoms/search/SearchInput'


// 型のインポート
import { FetchOrder } from '../../../types/order/order'
import { fetchItems } from '../../../types/items/items'

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

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    },
    serchItems: {
      width: "300px",
      border: "1px solid #fff",
      borderRadius: "4px",
      background: "#fff"
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
  const suggestItems: fetchItems[] = useSelector(selectSuggestItems)
  const [searchItem, setSearchItem] = useState<string>("")

  const login = () => {
    console.log('login')
    dispatch(loginUserAsync())
  }
  const logout = () => {
    console.log('logout')
    dispatch(signOutUserInfoAsync())
  }

  // オートコンプリートの値取得,商品を取得
  const serchItems = (value: string) => {
    setSearchItem(value)
    setSearchItem((pre) => {
      console.log(pre)
      console.log('次で発火します')
      dispatch(searchItemsAsync(pre))
      return pre
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.flexSpace} >
          <Typography onClick={() => { history.push('/') }} className={classes.title} variant="h6" noWrap>
            EC-Rakuraku-Rakuten
          </Typography>
          {/* <SearchInput></SearchInput> */}
          <Autocomplete
            onChange={(event: any, value: string) => { serchItems(value) }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={suggestItems.map((option) => option.name)}
            renderInput={(params: any): any => (
              <TextField
                onKeyPress={
                  (e) => {
                    if (e.key == 'Enter') {
                      e.preventDefault();
                    }
                  }
                }
                className={classes.serchItems}
                {...params}
                label="商品検索"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
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