import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import styled from 'styled-components'

// コンポーネント
import { Header } from '../organisums/header/Header'
import { PrimaryButton } from '../atoms/button/PrimaryButton'
import { TotalPrice } from '../molecules/itemPrice/TotalPrice'

// 型のインポート
import { FetchOrder } from '../../types/order/order'

// 各種機能のインポート
import { selectOrderUpdate } from '../../features/order/orderUpdateSlice'
import { fetchOrderAsync, selectFetchOrder } from '../../features/order/fetchOrderSlice'
import { selectUserId } from '../../features/user/userSlice'
import { updateOrderStatusAsync } from '../../features/order/updateOrderStatusSlice'
import { statusZeroIdAsync, selectStatusZeroId } from '../../features/statusZeroId/statusZeroIdSlice'

// マテリアルUI
import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// 入力フォーム
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import HomeIcon from '@material-ui/icons/Home';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

// ラジオボタン
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

type Inputs = {
  name: string,
  zipcode: number,
  address: string,
  phoneNumber: number,
  email: string,
  creditNumber?: number,
  status?: number
  orderDate?: string
  radio: string
};

export const OrderConfirm = () => {
  const classes = useStyles();
  const dipatch = useDispatch()
  const statusZeroId = useSelector(selectStatusZeroId)

  // React-Hook-Form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!
  const orderUpdate = useSelector(selectOrderUpdate)
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder)

  // 支払い方法の場合分け
  const [payWay, setPayWay] = useState<null | string>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayWay((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    // string型であることを保証する
    if (typeof userId === 'string') {
      // カートリストの中でstatusが0の注文情報をとってくる
      dipatch(fetchOrderAsync(userId))
    }
    // orderUpdateの配列状況が変更されるたびに発火して最新のカート情報をFirebaseから取得するようにする。
  }, [orderUpdate.length])

  useEffect(() => {
    if (typeof userId === 'string') {
      // 現在のstatus0の注文情報IDを取得
      dipatch(statusZeroIdAsync(userId))
    }
    // 一回だけ発火して現在のstatus0注文情報を取得する
  }, [])


  // 総合計金額の表示
  let totoalPrice: number = 0
  fetchData.forEach((item) => {
    totoalPrice += (item.itemPrice * item.itemCount)
  })

  // 入力フォーム完了時
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('onSubmitが発火しました。')
    console.log(data)
    // オブジェクトをコピー
    const update = { ...data }
    // 代引きでcreditNumbernのプロパティを保持している時は削除
    if (payWay === '1' && update.hasOwnProperty('creditNumber')) {
      delete update.creditNumber
    }
    // クレジットか代引きかで場合分け代引き=1/クレジット=2
    update.status = Number(payWay)
    const updateObject = {
      statusZeroId,
      userId,
      update,
    }
    dipatch(updateOrderStatusAsync(updateObject))
  }
  console.log('watchメソッド', watch())
  console.log('register', register)
  console.log(errors)

  return (
    <>
      <Header></Header>
      <ContainerPadding>
        <h2>OrderConfirmです。</h2>
        {!fetchData.length ? <h2>カートに商品情報はありません</h2> :
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>商品名</TableCell>
                    <TableCell align="right">値段（税込）</TableCell>
                    <TableCell align="right">個数</TableCell>
                    <TableCell align="right">合計金額（税込）</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetchData.map((row: FetchOrder, index: number) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.itemName}
                      </TableCell>
                      <TableCell align="right">{row.itemPrice}</TableCell>
                      <TableCell align="right">{row.itemCount}</TableCell>
                      <TableCell align="right">{((row.itemPrice) * (row.itemCount)).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TotalPrice totoalPrice={totoalPrice}></TotalPrice>
            <BorderLine></BorderLine>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <TextField
                    {...register("orderDate", { required: '配達希望日を入力してください' })}
                    id="date"
                    label="配達希望日"
                    type="date"
                    defaultValue="2020-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                {/* 名前の入力 */}
                <div>
                  <TextField
                    {...register("name", { required: 'ここに名前を入力してください' })}
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="名前"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.name &&
                    <FontColorRed>
                      {errors.name.message}
                    </FontColorRed>}
                </div>
                {/* 郵便番号入力 */}
                <div>
                  <TextField
                    {...register("zipcode", {
                      // 空白の時
                      required: '郵便番号を入力してください。',
                      // ８桁以上の時
                      maxLength: {
                        value: 8,
                        message: '数字８桁以内で入力してください。'
                      },
                      // 正規表現ではないとき
                      pattern: {
                        value: /^\d{3}-\d{4}$/,
                        message: '正しい郵便番号を入力してください。'
                      }
                    })}
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="郵便番号"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ChatBubbleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.zipcode &&
                    <FontColorRed>
                      {errors.zipcode.message}
                    </FontColorRed>}
                </div>
                {/* 住所入力蘭 */}
                <div>
                  <TextField
                    {...register("address", { required: '住所を入力してください。', })}
                    id="address"
                    label="住所"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.address &&
                    <FontColorRed>
                      {errors.address.message}
                    </FontColorRed>}
                </div>
                {/* 電話番号入力 */}
                <div>
                  <TextField
                    {...register("phoneNumber", {
                      required: '電話番号を入力してください。',
                      // ８桁以上の時
                      maxLength: {
                        value: 13,
                        message: 'ハイフン「-」含めた13桁で入力してください。'
                      },
                      // 正規表現ではないとき
                      pattern: {
                        value: /^(070|080|090)-\d{4}-\d{4}$/,
                        message: '070 or 080 or 090から始まる携帯電話を入力してください。'
                      }
                    })}
                    id="phoneNumber"
                    label="携帯電話番号"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroidIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.phoneNumber &&
                    <FontColorRed>
                      {errors.phoneNumber.message}
                    </FontColorRed>}
                </div>
                {/* Email入力 */}
                <div>
                  <TextField
                    {...register("email", {
                      required: 'メールアドレスを入力してください。',
                      // 正規表現ではないとき
                      pattern: {
                        value: /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/,
                        message: 'アットマーク「@」を含むメールアドレスを入力してください。'
                      }
                    })}
                    id="email"
                    label="メールアドレス"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.email &&
                    <FontColorRed>
                      {errors.email.message}
                    </FontColorRed>}
                </div>
                {/* ラジオボタン */}
                <div>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">支払い方法</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={payWay}
                      onChange={handleChange}>
                      <FormControlLabel value="1" control={<Radio />} label="cash" />
                      <FormControlLabel value="2" control={<Radio />} label="credit" />
                    </RadioGroup>
                  </FormControl>
                </div>
                {/* クレジットカード */}
                {payWay === null || payWay === '1' ? '' :
                  <div>
                    <TextField
                      {...register("creditNumber", {
                        required: 'クレジットカード番号を入力してください。',
                      })}
                      id="creditNumber"
                      label="クレジットカード"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RecentActorsIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.creditNumber &&
                      <FontColorRed>
                        {errors.creditNumber.message}
                      </FontColorRed>}
                  </div>
                }
                <p>
                  <input type="submit"></input>
                </p>
              </form>
            </div>
            <span>
              <PrimaryButton>注文完了</PrimaryButton>
            </span>
          </>
        }
      </ContainerPadding>
    </>
  )
}

const ContainerPadding = styled.div`
  padding:0 40px
`
const BorderLine = styled.div`
  border-bottom:1px solid #000;
  margin:30px 0;
`
const FontColorRed = styled.p`
  color:red
`
