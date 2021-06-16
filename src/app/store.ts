import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import itemsReducer from '../features/items/itemsSlice'
import itemsCountReducer from '../features/itemCount/itemCount'
import itemPriceReducer from '../features/itemPrice/itemPrice'
import addOrderReducer from '../features/order/orderSlice'
import fetchOrderReducer from '../features/order/fetchOrder'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    items: itemsReducer,
    itemCount: itemsCountReducer,
    itemPrice: itemPriceReducer,
    addOrder: addOrderReducer,
    fetchOrder: fetchOrderReducer,
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
