import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { FetchOrder } from '../../types/order/order'
import { DeleteOrder } from '../../types/order/order'



const initialState: Array<FetchOrder> = []

export const fetchOrderAsync = createAsyncThunk('fetchOrder/fetchOrderAsync', async (userId: string) => {
  console.log('fetchOrderAsyncが発火します。')
  // stateで管理するための配列を用意
  let fetchOrderStatus: Array<FetchOrder> = []
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('orders');
  // statusが0の注文情報をFirestoreから引っ張ってくる
  await ordersRef
    .where('status', '==', 0)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fetchOrderStatus = doc.data().orderItems
      })
    })
    .catch((error) => {
      console.log(error)
    });
  console.log('status = 0の情報fetchOrderStatusの中身を確認', fetchOrderStatus)
  return fetchOrderStatus
});


export const deleteOrderAsync = createAsyncThunk('deleteOrder/deleteOrderAsync', async (deleteElements: DeleteOrder) => {
  const { userId, statusZeroId, updateFetchData } = deleteElements
  if (updateFetchData.length !== 0) {
    await firebase
      .firestore()
      .collection(`users/${userId}/orders`)
      .doc(statusZeroId)
      .update({
        orderItems: updateFetchData,
      })
      .then(() => {
        console.log('アップデートに成功しました。')
      })
    return updateFetchData
  } else {
    await firebase
      .firestore()
      .collection(`users/${userId}/orders`)
      .doc(statusZeroId)
      .delete()
      .then(() => {
        console.log('全削除に成功しました。')
      })
    return updateFetchData
  }
});


export const fetchOrderSlice = createSlice({
  name: 'fetchOrder',
  initialState,

  reducers: {
    deleteOrderItem: (state, action) => {
      const updateItem = [...state]
      updateItem.splice(action.payload, 1)
      return updateItem
    },
  },

  extraReducers: (builder) => {

    console.log(builder)
    // fetchOrderAsyncの非同期通信だった時
    builder.addCase(fetchOrderAsync.fulfilled, (state, action: PayloadAction<Array<FetchOrder>>) => {
      console.log('fetchOrderAsyncのstateとpayload', state, action)
      return action.payload
    })
    builder.addCase(deleteOrderAsync.fulfilled, (state, action: PayloadAction<Array<FetchOrder>> | PayloadAction<[]>) => {
      return action.payload
    })
  },
});

export const { deleteOrderItem } = fetchOrderSlice.actions;


export const selectFetchOrder = (state: RootState) => state.fetchOrder

export default fetchOrderSlice.reducer;