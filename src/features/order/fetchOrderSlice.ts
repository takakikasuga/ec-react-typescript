import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { FetchOrder } from '../../types/order/order'
import { DeleteOrder } from '../../types/order/order'



const initialState: Array<FetchOrder> = []

export const fetchOrderAsync = createAsyncThunk('fetchOrder/fetchOrderAsync', async (userId: string) => {
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
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.data(), doc.id)
        fetchOrderStatus = doc.data().orderItems
        console.log(fetchOrderStatus)
      })
    })
    .catch((error) => {
      console.log(error)
    });
  console.log(userId)
  console.log(fetchOrderStatus)
  return fetchOrderStatus
});


export const deleteOrderAsync = createAsyncThunk('deleteOrder/deleteOrderAsync', async (deleteElements: DeleteOrder) => {
  console.log('deleteOrderAsync')
  console.log(deleteElements)
  const { userId, statusZeroId, updateFetchData } = deleteElements
  console.log(userId, statusZeroId)
  console.log(updateFetchData)
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
    console.log('アップデートした値を返します')
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
    console.log(updateFetchData)
    console.log('空の配列を返します')
    return updateFetchData
  }
});


export const fetchOrderSlice = createSlice({
  name: 'fetchOrder',
  initialState,

  reducers: {
    deleteOrderItem: (state, action) => {
      console.log('deleteOrderItem')
      console.log(state, action)
      const updateItem = [...state]
      updateItem.splice(action.payload, 1)
      console.log(updateItem)
      return updateItem
    },
  },

  extraReducers: (builder) => {

    console.log(builder)
    // fetchOrderAsyncの非同期通信だった時
    builder.addCase(fetchOrderAsync.fulfilled, (state, action: PayloadAction<Array<FetchOrder>>) => {
      console.log('fetchOrderAsync')
      console.log(state)
      console.log(action)
      return action.payload
    })
    builder.addCase(deleteOrderAsync.fulfilled, (state, action: PayloadAction<Array<FetchOrder>> | PayloadAction<[]>) => {
      console.log('deleteOrderAsync')
      console.log(state)
      console.log(action)
      return action.payload
    })
  },
});

export const { deleteOrderItem } = fetchOrderSlice.actions;


export const selectFetchOrder = (state: RootState) => state.fetchOrder

export default fetchOrderSlice.reducer;