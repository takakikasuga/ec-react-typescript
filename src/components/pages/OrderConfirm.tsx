import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styled from 'styled-components';

// コンポーネント
import { Header } from '../organisums/header/Header';
import { TotalPrice } from '../molecules/itemPrice/TotalPrice';
import { TableHeaer } from '../organisums/tableConfirm/TableHeader';
import { TableRowContents } from '../organisums/tableConfirm/TableRowContents';

// 型のインポート
import { FetchOrder } from '../../types/order/order';
import { fetchItems } from '../../types/items/items';

// 各種機能のインポート
import { selectOrderUpdate } from '../../features/order/orderUpdateSlice';
import {
  fetchOrderAsync,
  selectFetchOrder,
  orderCompletedItems,
} from '../../features/order/fetchOrderSlice';
import { selectUserId } from '../../features/user/userSlice';
import { updateOrderStatusAsync } from '../../features/order/updateOrderStatusSlice';
import {
  statusZeroIdAsync,
  selectStatusZeroId,
} from '../../features/statusZeroId/statusZeroIdSlice';
import { selectItems } from '../../features/items/itemsSlice';

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

// 入力フォーム
import InputAdornment from '@material-ui/core/InputAdornment';
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
import Button from '@material-ui/core/Button';

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
  })
);

// react-hook-formで扱う各種プロパティ
type Inputs = {
  name: string;
  zipcode: number;
  address: string;
  phoneNumber: number;
  email: string;
  creditNumber?: number;
  status?: string | number;
  orderDate?: string;
  totoalPrice?: number;
};

export const OrderConfirm = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const statusZeroId = useSelector(selectStatusZeroId);
  const items: fetchItems[] = useSelector(selectItems);

  // React-Hook-Form
  // defaultValuesでラジオボタンの初期値を設定
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>({ defaultValues: { status: '1' } });
  // nullを「!」で明示的になくす
  const userId: string = useSelector(selectUserId)!;
  const orderUpdate = useSelector(selectOrderUpdate);
  const fetchData: Array<FetchOrder> = useSelector(selectFetchOrder);
  const [flag, setFlag] = useState<boolean>(false);
  const [orderFlag, setOrderFlag] = useState<boolean>(false);

  const changeFlag = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    // string型であることを保証する
    if (typeof userId === 'string') {
      // カートリストの中でstatusが0の注文情報をとってくる
      dispatch(fetchOrderAsync(userId));
    }
    // orderUpdateの配列状況が変更されるたびに発火して最新のカート情報をFirebaseから取得するようにする。
  }, [orderUpdate.length]);

  useEffect(() => {
    if (typeof userId === 'string') {
      // 現在のstatus0の注文情報IDを取得
      dispatch(statusZeroIdAsync(userId));
    }
    // 一回だけ発火して現在のstatus0注文情報を取得する
  }, []);

  // 総合計金額の表示
  let totoalPrice: number = 0;
  fetchData.forEach((item) => {
    totoalPrice += item.itemPrice * item.itemCount;
  });

  // 入力フォーム完了時
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setOrderFlag(true);
    dispatch(orderCompletedItems());
    setTimeout(() => {
      history.push('/');
    }, 3000);
    // オブジェクトをコピー
    const update = { ...data };
    // 代引きでcreditNumbernのプロパティを保持している時は削除
    if (update.status === '1' && update.hasOwnProperty('creditNumber')) {
      delete update.creditNumber;
    }
    // 入力したstatusをnumber型として代入する
    update.status = update.status as number;
    // 注文情報の総合計金額をいれる
    update.totoalPrice = Number(totoalPrice);
    const updateObject = {
      statusZeroId,
      userId,
      update,
    };
    dispatch(updateOrderStatusAsync(updateObject));
  };
  console.log(fetchData.length);

  return (
    <>
      <Header></Header>
      {!orderFlag ? (
        ' '
      ) : (
        <FontColorRed>
          注文が確定しました。およそ3秒後にトップページへ画面遷移します。
        </FontColorRed>
      )}
      <ContainerPadding>
        {!fetchData.length ? (
          <h2>カートに商品情報はありません</h2>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size='small'
                aria-label='a dense table'>
                <TableHeaer></TableHeaer>
                <TableBody>
                  {/* アイテムid と一致するオブジェクトを返却する */}
                  {fetchData.map((row: FetchOrder, index: number) => {
                    let imageObject = items.find((element) => {
                      return element.id === row.itemId;
                    });
                    return (
                      <TableRowContents
                        row={row}
                        indexNum={index}
                        key={index}
                        imagePath={imageObject?.imagePath}></TableRowContents>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TotalPrice totoalPrice={totoalPrice}></TotalPrice>
            <Wrapper>
              <Button
                disabled={flag}
                onClick={() => {
                  changeFlag();
                }}
                variant='contained'>
                お届け先情報を入力する
              </Button>
            </Wrapper>
            {/* 入力するを許可したときに入力フィールドが出力される */}
            {!flag ? (
              ''
            ) : (
              <>
                <BorderLine></BorderLine>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <TextField
                        {...register('orderDate', {
                          required: '配達希望日を入力してください',
                          validate: {
                            overYear: (data: any): any => {
                              return (
                                Number(data?.slice(0, 4)) >=
                                new Date().getFullYear()
                              );
                            },
                            overMonth: (data: any): any => {
                              return (
                                Number(data?.slice(5, 7)) >=
                                new Date().getMonth() + 1
                              );
                            },
                            justOverDate: (data: any): any => {
                              if (
                                Number(data?.slice(0, 4)) ===
                                  new Date().getFullYear() &&
                                Number(data?.slice(5, 7)) ===
                                  new Date().getMonth() + 1 &&
                                !(
                                  Number(data?.slice(8, 10)) >=
                                  new Date().getDate()
                                )
                              ) {
                                return false;
                              }
                            },
                            justDate: (data: any): any => {
                              if (
                                Number(data?.slice(0, 4)) ===
                                  new Date().getFullYear() &&
                                Number(data?.slice(5, 7)) ===
                                  new Date().getMonth() + 1 &&
                                Number(data?.slice(8, 10)) ===
                                  new Date().getDate()
                              ) {
                                return false;
                              }
                            },
                          },
                        })}
                        id='date'
                        label='配達希望日'
                        type='date'
                        defaultValue='2020-05-24'
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {errors.orderDate?.type === 'overYear' && (
                        <FontColorRed>既に対象年はすぎています。</FontColorRed>
                      )}
                      {errors.orderDate?.type === 'overMonth' && (
                        <FontColorRed>
                          既に対象年月はすぎています。
                        </FontColorRed>
                      )}
                      {errors.orderDate?.type === 'justOverDate' && (
                        <FontColorRed>
                          既に対象年月日はすぎています。
                        </FontColorRed>
                      )}
                      {errors.orderDate?.type === 'justDate' && (
                        <FontColorRed>
                          明日以降の日付を選択してください。
                        </FontColorRed>
                      )}
                    </div>
                    {/* 名前の入力 */}
                    <div>
                      <TextField
                        {...register('name', {
                          required: 'ここに名前を入力してください',
                        })}
                        className={classes.margin}
                        id='input-with-icon-textfield'
                        label='名前'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.name && (
                        <FontColorRed>{errors.name.message}</FontColorRed>
                      )}
                    </div>
                    {/* 郵便番号入力 */}
                    <div>
                      <TextField
                        {...register('zipcode', {
                          // 空白の時
                          required: '郵便番号を入力してください。',
                          // ８桁以上の時
                          maxLength: {
                            value: 8,
                            message: '数字８桁以内で入力してください。',
                          },
                          // 正規表現ではないとき
                          pattern: {
                            value: /^\d{3}-\d{4}$/,
                            message: '正しい郵便番号を入力してください。',
                          },
                        })}
                        className={classes.margin}
                        id='input-with-icon-textfield'
                        label='郵便番号'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ChatBubbleIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.zipcode && (
                        <FontColorRed>{errors.zipcode.message}</FontColorRed>
                      )}
                    </div>
                    {/* 住所入力蘭 */}
                    <div>
                      <TextField
                        {...register('address', {
                          required: '住所を入力してください。',
                        })}
                        id='address'
                        label='住所'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <HomeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.address && (
                        <FontColorRed>{errors.address.message}</FontColorRed>
                      )}
                    </div>
                    {/* 電話番号入力 */}
                    <div>
                      <TextField
                        {...register('phoneNumber', {
                          required: '電話番号を入力してください。',
                          // ８桁以上の時
                          maxLength: {
                            value: 13,
                            message:
                              'ハイフン「-」含めた13桁で入力してください。',
                          },
                          // 正規表現ではないとき
                          pattern: {
                            value: /^(070|080|090)-\d{4}-\d{4}$/,
                            message:
                              '070 or 080 or 090から始まる携帯電話を入力してください。',
                          },
                        })}
                        id='phoneNumber'
                        label='携帯電話番号'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <PhoneAndroidIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.phoneNumber && (
                        <FontColorRed>
                          {errors.phoneNumber.message}
                        </FontColorRed>
                      )}
                    </div>
                    {/* Email入力 */}
                    <div>
                      <TextField
                        {...register('email', {
                          required: 'メールアドレスを入力してください。',
                          // 正規表現ではないとき
                          pattern: {
                            value: /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/,
                            message:
                              'アットマーク「@」を含むメールアドレスを入力してください。',
                          },
                        })}
                        id='email'
                        label='メールアドレス'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <MailOutlineIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.email && (
                        <FontColorRed>{errors.email.message}</FontColorRed>
                      )}
                    </div>
                    {/* ラジオボタン */}

                    <Controller
                      name='status'
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioGroup
                            aria-label='pay'
                            {...field}
                            name='payMethod'>
                            <FormControlLabel
                              style={{ justifyContent: 'center' }}
                              value='1'
                              control={<Radio />}
                              label='代引き'
                            />
                            <FormControlLabel
                              style={{ justifyContent: 'center' }}
                              value='2'
                              control={<Radio />}
                              label='クレジットカード'
                            />
                          </RadioGroup>
                        );
                      }}
                      rules={{ required: '支払い方法を選択して下さい' }}
                    />

                    {/* 何も入力がない場合に出すエラーメッセージ */}
                    {errors.status && (
                      <FontColorRed>{errors.status.message}</FontColorRed>
                    )}
                    {/* status = 2、つまりクレジットカードを選択している場合 */}
                    {watch().status === '2' && (
                      <div>
                        <TextField
                          {...register('creditNumber', {
                            required:
                              'クレジットカード番号を入力してください。',
                          })}
                          id='creditNumber'
                          label='クレジットカード'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <RecentActorsIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.creditNumber && (
                          <FontColorRed>
                            {errors.creditNumber.message}
                          </FontColorRed>
                        )}
                      </div>
                    )}
                    <p>
                      <SubmitButton type='submit'></SubmitButton>
                    </p>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </ContainerPadding>
    </>
  );
};

const ContainerPadding = styled.div`
  padding: 0 40px;
  margin-top: 40px;
`;
const BorderLine = styled.div`
  border-bottom: 1px solid #000;
  margin: 30px 0;
`;
const FontColorRed = styled.p`
  color: red;
`;
const AlignCenter = styled.div`
  text-align: center;
`;
const SubmitButton = styled.input`
  display: inline-block;
  border-radius: 5%; /* 角丸       */
  font-size: 18pt; /* 文字サイズ */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 12px 12px; /* 余白       */
  background: #000066; /* 背景色     */
  color: #ffffff; /* 文字色     */
  line-height: 1em; /* 1行の高さ  */
  transition: 0.3s; /* なめらか変化 */
  box-shadow: 6px 6px 3px #666666; /* 影の設定 */
  border: 2px solid #000066; /* 枠の指定 */
  &:hover {
    box-shadow: none; /* カーソル時の影消去 */
    color: #000066; /* 背景色     */
    background: #ffffff; /* 文字色     */
  }
`;
const Wrapper = styled.div`
  margin-bottom: 32px;
`;
