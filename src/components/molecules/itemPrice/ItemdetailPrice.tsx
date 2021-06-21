import React from 'react'
import Typography from '@material-ui/core/Typography';
export const ItemdetailPrice = (props: any) => {
  const { item } = props
  return (
    <>
      <Typography variant="body2" color="textSecondary" component="p">
        Mサイズ：{Math.round((item.price.m * 1.1))}円（税込）
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Lサイズ： {Math.round((item.price.l * 1.1))}円（税込）
      </Typography>
    </>
  )
}
