import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { FetchHistory, FetchObject } from '../../types/history/orderHistory'
import { CancelOrder, UpdateCancelOrder, CancelObject } from '../../types/history/cancelOrder'

const initialState: FetchHistory = []

export const orderHistoryAsync = createAsyncThunk('orderHistor/orderHistoryAsync', async (userId: string) => {
  let orderHistory: FetchHistory = []
  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
    await ordersRef
      // statusが0以外の注文情報を拾ってくる
      .where('status', '!=', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let object = doc.data() as FetchObject
          // 注文情報のIDをオブジェクトに持たせる
          object.orderUniqueId = doc.id
          orderHistory.push(object)
        });
      });
  }
  return orderHistory
});
// CancelOrder型一時的にエラ〜
export const cancelOrderHistoryAsync = createAsyncThunk('cancelOrderHistory/cancelOrderHistoryAsync', async (cancelStatus: any) => {
  let { userId, uniqueOrderId } = cancelStatus
  let orderHistory: any = []
  if (userId) {
    // 注文情報の商品に一意のIDを作成
    const ordersRef =
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders');
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

  return uniqueOrderId
});

export const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,

  reducers: {
    cancelOrderStatus: (state, action) => {
      return state
    },
    // ログアウト同時に、注文履歴の中身を削除
    logoutUserHistoryItems: (state) => {
      state.splice(0)
      return state
    },
  },

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(orderHistoryAsync.fulfilled, (state, action: PayloadAction<FetchHistory>) => {
      return action.payload
    })
    builder.addCase(cancelOrderHistoryAsync.fulfilled, (state, action) => {
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
      return state
    })
  },
});

export const { cancelOrderStatus, logoutUserHistoryItems } = orderHistorySlice.actions;

export const selectOrderHistory = (state: RootState) => state.orderHistory

export default orderHistorySlice.reducer;