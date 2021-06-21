import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase'

// 型のインポート
import { FetchOrder } from '../../types/order/order'
import { DeleteOrder } from '../../types/order/order'



const initialState: Array<FetchOrder> = []

export const fetchOrderAsync = createAsyncThunk('fetchOrder/fetchOrderAsync', async (userId: string) => {
  console.log('fetchOrderAsyncが発火します。', userId)
  // stateで管理するための配列を用意
  let fetchOrderStatus: Array<FetchOrder> = []
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('orders');
  // ローカルストレージの状況に応じて処理を分岐
  // ローカルストレージに商品情報が存在する場合（status0に追加及び新規登録）
  if (localStorage.getItem("LOCAL_CART_LISTS")) {
    console.log("ローカルストレージに値を保持しています。")
    // statusが0の物を取得する
    let status0Id: string | null = null
    // 更新するための仮の入れ物を作成する
    let updataArray: any = []
    // ローカルストレージのデータをJavascript形式に変換
    let localStrageItems = JSON.parse(localStorage.getItem("LOCAL_CART_LISTS") as string)

    console.log("Firebase通信に入ります。")
    // statusが0のidを取得
    await ordersRef
      .where('status', '==', 0)
      .get()
      .then((querySnapshot) => {
        console.log("idの取得とデートの取得", querySnapshot)
        // status0の注文情報がある場合に限り、発火する
        querySnapshot.forEach((doc) => {
          // status0のIDを取得
          status0Id = doc.id
          // status0のデータを取得
          updataArray = doc.data().orderItems
        })
      })
      .catch((error) => {
        console.log(error)
      });

    //  Firebaseにstatus0の商品情報がある場合の条件分岐
    if (status0Id) {
      localStrageItems.orderItems.forEach((element: any) => {
        updataArray.push(element)
      })
      await ordersRef
        .doc(status0Id)
        .update({
          orderItems: updataArray
        })
    } else {
      await ordersRef
        .add(localStrageItems)
    }
    // ローカルストレージに保存されている注文情報をまとめて削除する
    localStorage.removeItem("LOCAL_CART_LISTS")
    // 上記の工程を経て初めてデータを取得する新規データを取得する
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
  } else {
    // ローカルストレージに値を保持していない場合
    // 単純にstatusが0の注文情報をFirestoreから引っ張ってくる
    await ordersRef
      .where('status', '==', 0)
      .get()
      .then((querySnapshot) => {
        console.log("Firebase通信完了")
        querySnapshot.forEach((doc) => {
          fetchOrderStatus = doc.data().orderItems
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return fetchOrderStatus
});


export const deleteOrderAsync = createAsyncThunk('deleteOrder/deleteOrderAsync', async (deleteElements: DeleteOrder) => {
  const { userId, statusZeroId, updateFetchData } = deleteElements
  console.log("削除できているかの確認", userId, statusZeroId, updateFetchData)
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
    // ログアウト同時に、カートリスト/注文確認画面の中身を削除
    logoutUserItems: (state) => {
      console.log("logoutOrderItemが発火します。")
      console.log(current(state))
      state.splice(0)
      console.log(current(state))
      return state
    }
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

export const { deleteOrderItem, logoutUserItems } = fetchOrderSlice.actions;


export const selectFetchOrder = (state: RootState) => state.fetchOrder

export default fetchOrderSlice.reducer;