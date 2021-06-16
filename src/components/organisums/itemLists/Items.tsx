import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

// スライサーより取得
import { selectItems } from '../../../features/items/itemsSlice'
// マテリアルUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
export const Items = () => {
  const items = useSelector(selectItems)
  const dispach = useDispatch()

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {items.map((item: any, index: number) => (
        <>
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
              <Typography variant="body2" color="textSecondary" component="p">
                Mサイズ：{Math.round((item.price.m * 1.1)).toLocaleString()}円（税込）
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lサイズ： {Math.round((item.price.l * 1.1)).toLocaleString()}円（税込）
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </>
      ))}
    </Card>
  );
}
