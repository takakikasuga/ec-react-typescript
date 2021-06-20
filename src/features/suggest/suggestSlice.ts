import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'



const initialState: Array<fetchItems> = []

let fetchItemsData: Array<fetchItems> = []

export const suggestItemsAsync = createAsyncThunk('items/fetchItemsAsync', async () => {
  await firebase
    .firestore()
    .collection(`items/`)
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      snapshot.forEach((element: firebase.firestore.DocumentData) => {
        fetchItemsData.push(element.data())
      });
    })

  // アイテムidを昇順へと並び替える
  fetchItemsData.sort(function (first: fetchItems, second: fetchItems) {
    if (first.id! < second.id!) {
      return -1;
    } else {
      return 1;
    }
  });
  return fetchItemsData
});

export const suggestItemSlice = createSlice({
  name: 'items',
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
    // loginUserAsyncの非同期通信だった時
    builder.addCase(suggestItemsAsync.fulfilled, (state, action: PayloadAction<Array<fetchItems>>) => {
      console.log('suggestItemsAsync')
      return action.payload
    })
  },
});

export const selectSuggestItems = (state: RootState) => state.suggestItems

export default suggestItemSlice.reducer;
