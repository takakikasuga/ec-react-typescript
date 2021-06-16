import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import itemsReducer from '../features/items/itemsSlice'
import itemsCountReducer from '../features/itemCount/itemCount'
import itemPriceReducer from '../features/itemPrice/itemPrice'
import addOrderReducer from '../features/order/orderSlice'
import fetchOrderReducer from '../features/order/fetchOrder'
import cartListsReducer from '../features/cartLists/cartLists'
import statusZoroIdReducer from '../features/statusZoroId/statusZoroIdSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    items: itemsReducer,
    itemCount: itemsCountReducer,
    itemPrice: itemPriceReducer,
    addOrder: addOrderReducer,
    fetchOrder: fetchOrderReducer,
    cartLists: cartListsReducer,
    statusZoroId: statusZoroIdReducer,
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
