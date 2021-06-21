import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

// スライサーより取得
import { selectItems, fetchItemsAsync } from '../../../features/items/itemsSlice'

// コンポーネント
import { ItemdetailPrice } from '../../molecules/itemPrice/ItemdetailPrice'
import { FavoriteIconHeart } from '../../atoms/icons/FavoriteIconHeart'
import { StarIcon } from '../../atoms/icons/StarIcon'
import { PrimaryButton } from '../../atoms/button/PrimaryButton'

// 型のインポート
import { fetchItems } from '../../../types/items/items'

// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    width: "30%",
    margin: "20px"
  },
  media: {
    height: 300,
  },
});
export const Items = () => {
  const items: fetchItems[] = useSelector(selectItems)
  const dispatch = useDispatch()
  const history = useHistory()


  const changeToDetail = (path: string) => {
    history.push(path)
  }

  // アイテム一覧を再表示する
  const displayItems = () => {
    dispatch(fetchItemsAsync())
  }

  const classes = useStyles();
  return (
    <>
      {!items.length ?
        <>
          <h1>該当する商品がございません。</h1>
          <div onClick={displayItems}>
            <PrimaryButton>商品一覧へ</PrimaryButton>
          </div>
        </>
        :
        <>
          <FlecItems>
            {items.map((item: any, index: number) => (
              <Card className={classes.root} key={index}>
                <CardActionArea key={index}>
                  <CardMedia
                    className={classes.media}
                    image={item.imagePath}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <ItemdetailPrice item={item}></ItemdetailPrice>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <FavoriteIconHeart></FavoriteIconHeart>
                  <StarIcon></StarIcon>
                </CardActions>
                <div onClick={() => { changeToDetail(`/detail/${item.id}`) }}>
                  <PrimaryButton>詳細へ</PrimaryButton>
                </div>
              </Card>
            ))}
          </FlecItems>
          <div onClick={displayItems}>
            <PrimaryButton>商品一覧へ</PrimaryButton>
          </div>
        </>
      }
    </>
  );

}

// スタイルコンポーネント
const FlecItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`

