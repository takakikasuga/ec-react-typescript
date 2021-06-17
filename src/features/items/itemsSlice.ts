import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'



const initialState: Array<fetchItems> = []

let fetchItemsData: Array<fetchItems> = []

export const fetchItemsAsync = createAsyncThunk('items/fetchItemsAsync', async () => {
  await firebase
    .firestore()
    .collection(`Items/`)
    .get()
    .then((snapshot: any) => {
      snapshot.forEach((element: any) => {
        console.log('loginUserAsync')
        fetchItemsData.push(element.data())
      });
      console.log(fetchItemsData)
    })

  // アイテムidを昇順へと並び替える
  fetchItemsData.sort(function (first: fetchItems, second: fetchItems) {
    if (first.id! < second.id!) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(fetchItemsData)
  return fetchItemsData
});


export const signOutUserInfoAsync = createAsyncThunk('signOut/signOutUserInfo', async () => {
  await firebase.auth().signOut()
  return initialState
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
      console.log(state)
      console.log(action)
      console.log('fetchItemsAsync')
      return action.payload
    })
  },
});

export const selectItems = (state: RootState) => state.items

export default userSlice.reducer;
