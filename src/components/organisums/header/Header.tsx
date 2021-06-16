import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, selectUserName, loginUserAsync, signOutUserInfoAsync } from '../../../features/user/userSlice'
import { fetchItemsAsync } from '../../../features/items/itemsSlice'

import { SearchInput } from '../../atoms/search/SearchInput'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

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
    }
  }),
);

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)
  const userName = useSelector(selectUserName)

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
          <Typography className={classes.title} variant="h6" noWrap>
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
                <span className={classes.flexColum + " " + classes.margin}>
                  <AccountCircleIcon></AccountCircleIcon>
                  <span className={classes.fontHeaderSize}>アカウント</span>
                </span>
                <span className={classes.flexColum + " " + classes.margin}>
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <span className={classes.fontHeaderSize}>カート</span>
                </span>
                <span className={classes.flexColum + " " + classes.margin}>
                  <StarIcon></StarIcon>
                  <span className={classes.fontHeaderSize}>お気に入り</span>
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