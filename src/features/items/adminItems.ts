import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'



const initialState: Array<fetchItems> = []


export const fetchItemsAsync = createAsyncThunk('items/fetchItemsAsync', async () => {
  // 通信ごとに配列の中身をか空にする
  let fetchItemsData: Array<fetchItems> = []
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

export const userSlice = createSlice({
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
    builder.addCase(fetchItemsAsync.fulfilled, (state, action: PayloadAction<Array<fetchItems>>) => {
      console.log('fetchItemsAsync')
      console.log([...state])
      return action.payload
    })
  },
});

export const selectItems = (state: RootState) => state.items

export default userSlice.reducer;
