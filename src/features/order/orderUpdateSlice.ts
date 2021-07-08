import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase from 'firebase';
// 型のインポート
import { firebaseOrderInfo } from '../../types/order/firebaseOrderInfo';

// 型を当てはめてもエラーが出る（一旦保留）
const initialState: any = '';

export const orderUpdateAsync = createAsyncThunk(
  'orderUpdate/orderUpdateAsync',
  async (addOrder: firebaseOrderInfo) => {
    // addOrderを展開してコピー
    let newAddOrder = { ...addOrder };
    // userIdの型をstring保証する
    if (addOrder.userId) {
      // 注文情報の商品に一意のIDを作成
      const ordersRef = firebase
        .firestore()
        .collection('users')
        .doc(addOrder.userId)
        .collection('orders');
      const ref = ordersRef.doc();
      // 商品情報の配列0番目にユニークなIDを付与
      newAddOrder.orderInfo.orderItems[0].uniqueItemId = ref.id;
      // 実際に注文情報を追加（追加注文）
      let status0Id: Array<string> = [];
      // status = 0の注文IDを取得してstatus0Idに追加する
      await ordersRef
        .where('status', '==', 0)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // 取得してstatus0の注文情報IDを追加
            status0Id.push(doc.id);
          });
          const status0Ref = ordersRef.doc(status0Id[0]);
          // orderItemsの商品配列に追加した商品を追加する
          status0Ref.update({
            orderItems: firebase.firestore.FieldValue.arrayUnion(
              newAddOrder.orderInfo.orderItems[0]
            ),
          });
        });
    }
    return newAddOrder.orderInfo.orderItems;
  }
);

export const orderUpdateSlice = createSlice({
  name: 'orderUpdate',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // addOrderAsyncの非同期通信だった時
    builder.addCase(orderUpdateAsync.fulfilled, (state: any, action: any) => {
      // useEffectの第二引数で監視するためにスプレッド演算子で展開
      let updateItems = [...state, action.payload];
      return updateItems;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectOrderUpdate = (state: RootState) => state.orderUpdate;

export default orderUpdateSlice.reducer;
