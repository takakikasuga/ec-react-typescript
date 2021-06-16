import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'



const initialState: any = []

export const fetchOrderAsync = createAsyncThunk('fetchOrder/fetchOrderAsync', async (userId: string) => {
  // stateで管理するための配列を用意
  let fetchOrderStatus: any = []
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('orders');
  // statusが0のもをFirestoreから引っ張ってくる
  await ordersRef
    .where('status', '==', 0)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.data(), doc.id)
        fetchOrderStatus = doc.data().orderItems
      })
    })
    .catch((error) => {
      console.log(error)
    });
  console.log(userId)
  console.log(fetchOrderStatus)
  // return addOrder.orderInfo
  return fetchOrderStatus
});

export const deleteOrderAsync = createAsyncThunk('deleteOrder/deleteOrderAsync', async (deleteElements: any) => {
  console.log('deleteOrderAsync')
  console.log(deleteElements)
  const { userId, StatusZoroId, updateFetchData } = deleteElements
  console.log(userId, StatusZoroId)
  console.log(updateFetchData)
  await firebase
    .firestore()
    .collection(`users/${userId}/orders`)
    .doc(StatusZoroId)
    .update({
      orderItems: updateFetchData,
    })
    .then(() => {
      console.log('成功しました。')
    })
  console.log('成功しました。')
  return updateFetchData
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
    // setUserName: (state) => {
    //   state.value -= 1;
    // },

    // defaultUserStatus: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    console.log('fetchOrderAsync')
    console.log(builder)
    // addOrderAsyncの非同期通信だった時
    builder.addCase(fetchOrderAsync.fulfilled, (state, action: any) => {
      console.log(state)
      console.log(action)
      return action.payload
    })
  },
});

export const { deleteOrderItem } = fetchOrderSlice.actions;


export const selectFetchOrder = (state: RootState) => state.fetchOrder

export default fetchOrderSlice.reducer;