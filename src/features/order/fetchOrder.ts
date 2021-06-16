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

export const fetchOrderSlice = createSlice({
  name: 'fetchOrder',
  initialState,

  reducers: {
    // setUserId: (state) => {

    //   state.value += 1;
    // },
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

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectFetchOrder = (state: RootState) => state.fetchOrder

export default fetchOrderSlice.reducer;