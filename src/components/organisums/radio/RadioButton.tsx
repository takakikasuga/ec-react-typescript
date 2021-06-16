import React, { useState } from 'react'

// 型のインポート
import { RadioProps } from '../../../types/radio/radio'

// マテリアルUI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const RadioButton = (props: RadioProps) => {
  console.log(props)
  const { detail } = props
  console.log(detail)
  // ラジオボタンはstring型の時に動作する
  const [value, setValue] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">プライス</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value={String(detail.price?.m)} control={<Radio />} label={`M-Size：${Math.round((detail!.price!.m! * 1.1)).toLocaleString()}円（税込）`} />
          <FormControlLabel value={String(detail.price?.l)} control={<Radio />} label={`L-Size：${Math.round((detail!.price!.l! * 1.1)).toLocaleString()}円（税込）`} />
        </RadioGroup>
      </FormControl>
      <h4>合計金額</h4>
      <p>{Number(Math.round(Number(value)).toLocaleString())}円（税込）</p>
    </>
  )
}
