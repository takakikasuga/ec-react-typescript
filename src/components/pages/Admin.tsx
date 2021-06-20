import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { uploadItemDataAsync, fetchUploadItemData, selectAdmin } from '../../features/admin/adminSlice'
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


//0〜9の正数（正規表現）
const numberRegExp = /^([1-9]\d*|0)$/

type UploadState = {
  price_m: number | string;
  price_l: number | string;
  description: string;
  name: string;
  image: any
}

export const Admin = () => {
  const classes = useStyles();
  const adminArray = useSelector(selectAdmin)
  const [image, setImage] = useState<null | any>(null)
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

  // Firebaseにアップロードできるとき
  const onSubmit: SubmitHandler<UploadState> = (data: UploadState) => {

    // 文字列である金額をparseIntメソッドで10進数の数値に変換
    const new_Price_m = parseInt(data.price_m as string, 10)
    const new_Price_l = parseInt(data.price_l as string, 10)
    // imageファイルがアップロードされていない場合
    if (!image) {
      alert("画像ファイルをアップロードしてください。")
      // 画像ファイルの拡張子を検証して問題なければFirebaseに登録する処理を走らせる
    } else if ((image.name.slice(-3) === ("png" || "jpg")) || image.name.slice(-4) === "jpeg") {
      let itemObject = {
        // 今Firebase上にある商品情報のlengthに1を足す（次に入る商品情報はid + 1なので）
        id: (adminArray.length + 1),
        image: image,
        name: data.name,
        description: data.description,
        price: {
          m: new_Price_m,
          l: new_Price_l,
        }
      }
      // 非同期通信uploadItemDataAsyncへ処理を繋ぐ
      dispatch(uploadItemDataAsync(itemObject))
    } else {
      // 拡張子が指定のもの以外の時のアラート
      alert("拡張子を「.png」「.jpg」「.jpeg」のいずれかにしてください。")
    }
  }
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