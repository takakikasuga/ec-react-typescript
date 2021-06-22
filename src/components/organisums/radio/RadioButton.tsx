import React, { useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { setItemPrice } from '../../../features/itemPrice/itemPriceSlice'
// 型のインポート
import { RadioProps } from '../../../types/radio/radio'

// マテリアルUI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const RadioButton = memo((props: RadioProps) => {
  const { detail } = props
  const dispatch = useDispatch()
  // ラジオボタンはstring型の時に動作する
  const [value, setValue] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    // useState内部で扱うとエラーが起きるので、一度変数に入れてから対応
    const selectedItemPrice = (event.target as HTMLInputElement).value as unknown as number
    setValue(selectedItemPrice as unknown as string)
    dispatch(setItemPrice(selectedItemPrice))

    // 下記を実行するとエラーが生じる
    // setValue((event.target as HTMLInputElement).value);
    // setValue((pre: string) => {
    //   // set関数直後は値が更新されていないので、関数で行う
    //   dispatch(setItemPrice(Number(pre)))
    //   return pre
    // })
  };
  return (
    <FormControl component="fieldset" style={{ textAlign: "left" }}>
      <FormLabel component="legend">商品サイズ</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value={String(Math.round((detail!.price!.m! * 1.1)))} control={<Radio data-testid="mPrice" />} label={`M-Size：${Number(Math.round((detail!.price!.m! * 1.1))).toLocaleString()}円（税込）`} />
        <FormControlLabel value={String(Math.round((detail!.price!.l! * 1.1)))} control={<Radio data-testid="lPrice" />} label={`L-Size：${Number(Math.round((detail!.price!.l! * 1.1))).toLocaleString()}円（税込）`} />
      </RadioGroup>
    </FormControl>
  )
})
