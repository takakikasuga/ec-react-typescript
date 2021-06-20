import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { uploadItemData, fetchUploadItemData, selectAdmin } from '../../features/admin/adminSlice'
// import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { Header } from '../organisums/header/Header'

// マテリアルUI
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DescriptionIcon from '@material-ui/icons/Description';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { display } from '@material-ui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
      width: "400px"
    },
  }),
);

export const Admin = () => {
  const classes = useStyles();
  const adminArray = useSelector(selectAdmin)
  const [image, setImage] = useState<null | any>(null)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [price_m, setPrice_m] = useState(null)
  const [price_l, setPrice_l] = useState(null)
  const dispatch = useDispatch()
  console.log("Admin確認")
  useEffect(() => {
    console.log("useEffectが発火")
    dispatch(fetchUploadItemData())
  }, [])

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleName = (e: any) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleDescription = (e: any) => {
    setDescription(e.target.value)
  }
  const handlePrice_m = (e: any) => {
    e.preventDefault()
    setPrice_m(e.target.value)
  }
  const handlePrice_l = (e: any) => {
    e.preventDefault()
    setPrice_l(e.target.value)
  }

  const handleUpload = () => {
    console.log(image.name.slice(-3))
    console.log(image.name.slice(-4))
    console.log(image.name.slice(-3) === ("png" || "jpg"))
    console.log(image.name.slice(-4) === "jpeg")
    console.log(typeof price_m)
    console.log(typeof price_l)
    if ((image.name.slice(-3) === ("png" || "jpg")) || image.name.slice(-4) === "jpeg") {
      // console.log("adminArray.length", adminArray.length)
      // let itemObject = {
      //   id: (adminArray.length + 1),
      //   image: image,
      //   name: name,
      //   description: description,
      //   price: {
      //     m: price_m,
      //     l: price_l,
      //   }
      // }
      // dispatch(uploadItemData(itemObject))
    } else {
      alert("拡張子を「.png」「.jpg」「.jpeg」のいずれかにしてください。")
    }
    // 初期化
    // setImage(null)
    // setName(null)
    // setDescription(null)
    // setPrice_m(null)
    // setPrice_l(null)
  }
  console.log("image", image)
  return (
    <div>
      <Header></Header>
      <p>商品情報の追加</p>
      <p>画像は拡張子が「.png」「.jpg」や「.jpeg」にしてください。</p>
      <Button variant="contained" component="label">
        {image ?
          <p>以下のファイルが選択されています。</p>
          : <p>商品画像を選択</p>}
        <input type="file" hidden onChange={handleChange} />
      </Button>
      {!image ?
        <p>商品画像の選択が未完了です。</p>
        : <p>ファイル名：{image.name}</p>}
      <FlexColunm>
        <TextField
          type="number"
          onChange={handleName}
          className={classes.margin}
          id="input-with-icon-textfield"
          label="商品名"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FastfoodIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={handleDescription}
          className={classes.margin}
          id="input-with-icon-textfield"
          label="商品詳細"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={handlePrice_m}
          className={classes.margin}
          id="input-with-icon-textfield"
          label="Mサイズの金額"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={handlePrice_l}
          className={classes.margin}
          id="input-with-icon-textfield"
          label="Lサイズの金額"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOnIcon />
              </InputAdornment>
            ),
          }}
        />
      </FlexColunm>
      {/* Name：<input type="text" onChange={handleName} /> */}
      {/* Description：<input type="text" onChange={handleDescription} /> */}
      {/* M：<input type="text" onChange={handlePrice_m} />
      L：<input type="text" onChange={handlePrice_l} /> */}

      <Button
        // 全項目の入力が完了した場合入力できる状態にする
        disabled={image && name && price_l && price_m && description ? false : true}
        onClick={handleUpload} variant="contained" component="label">
        アップロード
      </Button>
    </div>
  )
}


const FlexColunm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
