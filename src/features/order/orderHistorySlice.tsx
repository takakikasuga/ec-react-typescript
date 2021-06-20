import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { FetchHistory, FetchObject } from '../../types/history/orderHistory'
import { CancelOrder, UpdateCancelOrder, CancelObject } from '../../types/history/cancelOrder'

const initialState: FetchHistory = []

export const orderHistoryAsync = createAsyncThunk('orderHistor/orderHistoryAsync', async (userId: string) => {
  console.log('orderHistoryAsyncが発火します')
  console.log('orderHistoryAsyncの中身を確認', userId)
  let orderHistory: FetchHistory = []
  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
    console.log('firebase通信手前')
    await ordersRef
      // statusが0以外の注文情報を拾ってくる
      .where('status', '!=', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id)
          let object = doc.data() as FetchObject
          // 注文情報のIDをオブジェクトに持たせる
          object.orderUniqueId = doc.id
          console.log(object)
          orderHistory.push(object)
        });
      });
  }
  console.log(orderHistory)
  return orderHistory
});
// CancelOrder型一時的にエラ〜
export const cancelOrderHistoryAsync = createAsyncThunk('cancelOrderHistory/cancelOrderHistoryAsync', async (cancelStatus: any) => {
  let { userId, uniqueOrderId } = cancelStatus
  console.log('cancelOrderHistoryが発火します')
  console.log('cancelOrderHistoryAsyncの中身を確認', cancelStatus)
  console.log(userId, uniqueOrderId,)

  let orderHistory: any = []
  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
    console.log('firebase通信手前')
    await ordersRef
      .doc(uniqueOrderId)
      // ステータスをキャンセルのstatus = 9に変更
      .update({
        status: 9
      })
      .then(() => {
        console.log('キャンセルへstatusを変更しました。')
      })
    // 解決方法が見つからず、連続で非同期通信を行い最新のFirebaseのstatusが0以外の情報を取得する
    // await ordersRef
    //   // statusが0以外の注文情報を拾ってくる
    //   .where('status', '!=', 0)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id)
    //       let object = doc.data() as FetchObject
    //       // 注文情報のIDをオブジェクトに持たせる
    //       object.orderUniqueId = doc.id
    //       console.log(object)
    //       orderHistory.push(object)
    //     });
    //   });
  }

  return uniqueOrderId
});

export const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,

  reducers: {
    cancelOrderStatus: (state, action: any) => {
      console.log('cancelOrderStatusが発火', state, action)

      return state
    },
    // setUserName: (state) => {
    //   state.value -= 1;
    // },

    // defaultUserStatus: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(orderHistoryAsync.fulfilled, (state, action: PayloadAction<FetchHistory>) => {
      console.log('orderHistoryAsyncのactionとstate', state, action.payload)

      return action.payload
    })
    builder.addCase(cancelOrderHistoryAsync.fulfilled, (state, action) => {
      console.log('ocancelOrderHistoryAsyncのactionとstate', state, action.payload)

      // 変更したいstatusのオブジェクトを取得
      const newObject = state.filter((element: FetchObject) => {
        return action.payload === element.orderUniqueId
      })

      // 変更したいstatusのオブジェクトのインデックス番号を取得
      const indexNum = state.findIndex((element: FetchObject) => {
        return action.payload === element.orderUniqueId
      })

      // statusを9に変更
      newObject[0].status = 9

      // 変更したいオブジェクトを丸ごと入れ替える
      state.splice(indexNum, 1, newObject[0])
      console.log(current(state))
      return state
    })
  },
});

export const { cancelOrderStatus } = orderHistorySlice.actions;


export const selectOrderHistory = (state: RootState) => state.orderHistory

export default orderHistorySlice.reducer;