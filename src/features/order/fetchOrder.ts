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
  // statusが0の注文情報をFirestoreから引っ張ってくる
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

// export const addOrderAsync = createAsyncThunk('addOrder/addOrderAsync', async (addOrder: any) => {
//   console.log(addOrder)
//   // 注文情報の商品に一意のIDを作成
//   const ordersRef =
//     firebase
//       .firestore()
//       .collection('users')
//       .doc(addOrder.userId)
//       .collection('orders');
//   const ref = ordersRef.doc();
//   // 商品情報の配列0番目にユニークなIDを付与
//   addOrder.orderInfo.orderItems[0].uniqueItemId = ref.id;
//   console.log(addOrder)

//   // status = 0を追加
//   addOrder.orderInfo.status = 0
//   // 実際に注文情報を追加（新規注文）
//   await firebase
//     .firestore()
//     .collection(`users/${addOrder.userId}/orders`)
//     .add(addOrder.orderInfo)
//     .then((doc) => {
//       console.log(doc.id)
//     })
//     .catch((error) => {
//       console.log(error)
//     })

//   console.log(addOrder)
//   console.log(addOrder.orderInfo)

//   console.log(addOrder.orderInfo)
//   return addOrder.orderInfo.orderItems
// });

export const deleteOrderAsync = createAsyncThunk('deleteOrder/deleteOrderAsync', async (deleteElements: any) => {
  console.log('deleteOrderAsync')
  console.log(deleteElements)
  const { userId, StatusZoroId, updateFetchData } = deleteElements
  console.log(userId, StatusZoroId)
  console.log(updateFetchData)
  if (updateFetchData.length !== 0) {
    await firebase
      .firestore()
      .collection(`users/${userId}/orders`)
      .doc(StatusZoroId)
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
      .doc(StatusZoroId)
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
    // setUserName: (state) => {
    //   state.value -= 1;
    // },

    // defaultUserStatus: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {

    console.log(builder)
    // fetchOrderAsyncの非同期通信だった時
    builder.addCase(fetchOrderAsync.fulfilled, (state, action: any) => {
      console.log('fetchOrderAsync')
      console.log(state)
      console.log(action)
      return action.payload
    })
    builder.addCase(deleteOrderAsync.fulfilled, (state, action: any) => {
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