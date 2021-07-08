import React from 'react';
import Typography from '@material-ui/core/Typography';
export const ItemdetailPrice = (props: any) => {
  const { item } = props;
  return (
    <>
      <Typography variant='body2' color='textSecondary' component='p'>
        Mサイズ：{Number(Math.round(item.price.m * 1.1)).toLocaleString()}
        円（税込）
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        Lサイズ： {Number(Math.round(item.price.l * 1.1)).toLocaleString()}
        円（税込）
      </Typography>
    </>
  );
};
