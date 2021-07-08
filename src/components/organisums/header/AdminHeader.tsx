import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// 機能のインポート
import {
  selectUserId,
  selectUserName,
  loginUserAsync,
  signOutUserInfoAsync,
} from '../../../features/user/userSlice';
import {
  fetchItemsAsync,
  selectItems,
  searchItemsAsync,
} from '../../../features/items/itemsSlice';
import {
  deleteOrderItem,
  fetchOrderAsync,
  selectFetchOrder,
} from '../../../features/order/fetchOrderSlice';
import { selectSuggestItems } from '../../../features/suggest/suggestSlice';

// コンポーネント
import { SearchInput } from '../../atoms/search/SearchInput';

// 型のインポート
import { FetchOrder } from '../../../types/order/order';
import { fetchItems } from '../../../types/items/items';

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
      alignItems: 'center',
    },
    flexColum: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    margin: {
      marginRight: '10px',
    },
    fontHeaderSize: {
      fontSize: '9px',
    },
    positionRelative: {
      position: 'relative',
    },
    // カートに入れている商品数
    cartCount: {
      position: 'absolute',
      backgroundColor: 'yellow',
      width: '20px',
      height: '20px',
      borderRadius: '100%',
      color: '#000',
      left: '15px',
      top: '-25px',
    },
    serchItems: {
      width: '300px',
      border: '1px solid #fff',
      borderRadius: '4px',
      background: '#fff',
    },
  })
);

export const AdminHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder);
  const suggestItems: fetchItems[] = useSelector(selectSuggestItems);
  const [searchItem, setSearchItem] = useState<string>('');

  const login = () => {
    dispatch(loginUserAsync());
  };
  const logout = () => {
    dispatch(signOutUserInfoAsync());
  };

  // オートコンプリートの値取得,商品を取得
  const serchItems = (value: string) => {
    setSearchItem(value);
    setSearchItem((pre) => {
      dispatch(searchItemsAsync(pre));
      return pre;
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.flexSpace}>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/admin');
            }}
            className={classes.title}
            variant='h6'
            noWrap>
            EC-Rakuraku-Rakuten
          </Typography>

          <div className={classes.flex}>
            {!userName ? (
              <Typography className={classes.margin}>
                ようこそ 管理者 さん
              </Typography>
            ) : (
              <Typography className={classes.margin}>
                ようこそ {userName} さん
              </Typography>
            )}
            {!userId ? (
              <span
                onClick={login}
                className={classes.flexColum}
                style={{ cursor: 'pointer' }}>
                <ExitToAppIcon></ExitToAppIcon>
                <span className={classes.fontHeaderSize}>ログイン</span>
              </span>
            ) : (
              <>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    history.push('/adminItems');
                  }}
                  className={classes.flexColum + ' ' + classes.margin}>
                  <ViewListIcon></ViewListIcon>
                  <span className={classes.fontHeaderSize}>商品一覧</span>
                </span>
                <span
                  onClick={logout}
                  className={classes.flexColum}
                  style={{ cursor: 'pointer' }}>
                  <NotInterestedIcon></NotInterestedIcon>
                  <span className={classes.fontHeaderSize}>ログアウト</span>
                </span>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
