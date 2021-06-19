import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import itemsReducer from '../features/items/itemsSlice'
import itemsCountReducer from '../features/itemCount/itemCountSlice'
import itemPriceReducer from '../features/itemPrice/itemPriceSlice'
import addOrderReducer from '../features/order/orderSlice'
import orderUpdateReducer from '../features/order/orderUpdateSlice'
import fetchOrderReducer from '../features/order/fetchOrderSlice'
import cartListsReducer from '../features/cartLists/cartListsSlice'
import statusZeroIdReducer from '../features/statusZeroId/statusZeroIdSlice'
import updateOrderStatusReducer from '../features/order/updateOrderStatusSlice'
import orderHistoryReducer from '../features/order/orderHistorySlice'
import suggestItemsReducer from '../features/suggest/suggestSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    items: itemsReducer,
    itemCount: itemsCountReducer,
    itemPrice: itemPriceReducer,
    addOrder: addOrderReducer,
    orderUpdate: orderUpdateReducer,
    fetchOrder: fetchOrderReducer,
    cartLists: cartListsReducer,
    statusZeroId: statusZeroIdReducer,
    updateOrderStatus: updateOrderStatusReducer,
    orderHistory: orderHistoryReducer,
    suggestItems: suggestItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
