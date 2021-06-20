import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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


// 0〜9の整数
const numberRegExp = /^([1-9]\d*|0)$/

type UploadState = {
  price_m: number;
  price_l: number;
  description: string;
  name: string;
  image: any
}

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

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<UploadState>();

  useEffect(() => {
    console.log("useEffectが発火")
    dispatch(fetchUploadItemData())
  }, [])

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  // const handleName = (e: any) => {
  //   e.preventDefault()
  //   setName(e.target.value)
  // }
  // const handleDescription = (e: any) => {
  //   setDescription(e.target.value)
  // }
  // const handlePrice_m = (e: any) => {
  //   e.preventDefault()
  //   setPrice_m(e.target.value)
  // }
  // const handlePrice_l = (e: any) => {
  //   e.preventDefault()
  //   setPrice_l(e.target.value)
  // }

  const handleUpload = () => {

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
  console.log('watchメソッド', watch())
  const onSubmit: SubmitHandler<UploadState> = (data: any) => {
    // 文字列である金額をparseIntメソッドで10進数の数値に変換
    const new_Price_m = parseInt(data.price_m, 10)
    const new_Price_l = parseInt(data.price_l, 10)

    // 画像ファイルの拡張子を検証して問題なければFirebaseに登録する処理を走らせる
    if ((image.name.slice(-3) === ("png" || "jpg")) || image.name.slice(-4) === "jpeg") {
      console.log("adminArray.length", adminArray.length)
      let itemObject = {
        id: (adminArray.length + 1),
        image: image,
        name: data.name,
        description: data.description,
        price: {
          m: new_Price_m,
          l: new_Price_l,
        }
      }
      dispatch(uploadItemData(itemObject))
    } else {
      alert("拡張子を「.png」「.jpg」「.jpeg」のいずれかにしてください。")
    }
  }
  console.log("watch", watch())
  console.log("watch", watch().price_l)
  console.log("watch", watch().price_m)
  return (
    <div>
      <Header></Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>商品情報の追加</p>
        <p>画像は拡張子が「.png」「.jpg」や「.jpeg」にしてください。</p>
        <Button
          variant="contained" component="label">
          {image ?
            <p>以下のファイルが選択されています。</p>
            : <p>商品画像を選択</p>}
          <input type="file" hidden onChange={handleChange} />
        </Button>
        {errors.image &&
          <FontColorRed>
            {errors.image.message}
          </FontColorRed>
        }
        {!image ?
          <p>商品画像の選択が未完了です。</p>
          : <p>ファイル名：{image.name}</p>}
        <FlexColunm>

          {/* 商品名入力エリア */}
          <TextField
            {...register("name", {
              required: '商品名を入力してください。',
            })}
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
          {errors.name &&
            <FontColorRed>
              {errors.name.message}
            </FontColorRed>
          }

          {/* 商品詳細入力エリア */}
          <TextField
            {...register("description", {
              required: '商品詳細を入力してください。',
            })}
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
          {errors.description &&
            <FontColorRed>
              {errors.description.message}
            </FontColorRed>
          }

          {/* Mサイズの金額入力エリア */}
          <TextField
            {...register("price_m", {
              required: 'Mサイズの金額を入力してください。',
              pattern: {
                value: numberRegExp,
                message: "整数値（１〜９）で入力してください。"
              },
            })}
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Mサイズ"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          {errors.price_m &&
            <FontColorRed>
              {errors.price_m.message}
            </FontColorRed>
          }

          {/* Lサイズの金額入力エリア */}
          <TextField
            {...register("price_l", {
              required: 'Lサイズの金額を入力してください。',
              pattern: {
                value: numberRegExp,
                message: "整数値（１〜９）で入力してください。"
              },
            })}
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Lサイズ"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          {errors.price_l &&
            <FontColorRed>
              {errors.price_l.message}
            </FontColorRed>
          }
        </FlexColunm>
        <Button
          // 全項目の入力が完了した場合入力できる状態にする
          component="label"
          color="primary"
          style={{ border: "1px solid #3F51B5" }}
        >
          <button type="submit" hidden>送信</button>
          アップロード
        </Button>

      </form>
    </div>
  )
}


const FlexColunm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FontColorRed = styled.p`
  color:red
`
const InputArea = styled.input`
  font: 15px/24px sans-serif;
	box-sizing: border-box;
  width: "600px"
	padding: 0.3em;
	transition: 0.3s;
	border: none;
	border-bottom: 2px solid #1b2538;
	background: transparent;
  &:focus {
    border-bottom: 2px solid #da3c41;
	  outline: none;
  }
`

// onClick = { handleUpload } variant = "contained" component = "label"