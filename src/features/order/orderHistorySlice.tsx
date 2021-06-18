import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const cancelOrderHistoryAsync = createAsyncThunk('cancelOrderHistory/cancelOrderHistoryAsync', async (cancelStatus: CancelOrder) => {
  let { userId, uniqueOrderId, copyOrderHistory } = cancelStatus
  let newObject = { uniqueOrderId, copyOrderHistory }
  console.log('cancelOrderHistoryが発火します')
  console.log('cancelOrderHistoryAsyncの中身を確認', cancelStatus)
  console.log(userId, uniqueOrderId, copyOrderHistory)

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
  }

  return newObject
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
    builder.addCase(cancelOrderHistoryAsync.fulfilled, (state, action: PayloadAction<UpdateCancelOrder>) => {
      console.log('ocancelOrderHistoryAsyncのactionとstate', state, action.payload)
      const { copyOrderHistory, uniqueOrderId } = action.payload
      // let changeStatus: any = []
      // let cloneOrderHistory = [...copyOrderHistory]
      // cloneOrderHistory.forEach((element: CancelObject) => {
      //   if (uniqueOrderId === element.orderUniqueId) {
      //     console.log(element)
      //     element.status = 9
      //   }
      //   changeStatus = [...changeStatus, element]
      // });
      console.log(copyOrderHistory)
      return copyOrderHistory
    })
  },
});

export const { cancelOrderStatus } = orderHistorySlice.actions;


export const selectOrderHistory = (state: RootState) => state.orderHistory

export default orderHistorySlice.reducer;