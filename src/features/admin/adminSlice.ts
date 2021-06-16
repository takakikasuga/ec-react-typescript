import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
// import { fetchCount } from './counterAPI';
import firebase from 'firebase'
import { strage } from '../../firebase/firebase.js'
import { providerGoogle } from '../../firebase/firebase'

import axios from 'axios'



const initialState: any = null

let itemObject: any = {
  imagePath: null,
  name: null,
  description: null,
  price: {
    m: null,
    l: null,
  }
}

export const uploadItemData = createAsyncThunk('uploadData/uploadItemDataAsync', async (object: any) => {
  // 上記変数オブジェクトに代入
  itemObject.name = object.name
  itemObject.description = object.description
  itemObject.price.m = object.price.m
  itemObject.price.l = object.price.l

  console.log('uploadItemDataAsync')
  console.log(object)
  function auth() {
    const uploadTask = strage.ref(`images/${object.image.name}`).put(object.image);
    return new Promise(resolve => {
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error)
        },
        () => {
          console.log('第二引数が発火')
          strage
            .ref("images")
            .child(object.image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url)
              itemObject.imagePath = url
              // Promiseで成功を返却する
              resolve('')
            })
        })
    })
  }
  console.log('await直前')
  await auth()
  await firebase
    .firestore()
    .collection(`items`)
    .add(itemObject)
    .then((doc) => {
      console.log(doc.id)
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('await直後')
  return itemObject
});

export const userSlice = createSlice({
  name: 'userStatus',
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
    builder.addCase(uploadItemData.fulfilled, (state, action: any) => {
      console.log(state)
      console.log(action)
      console.log('fetchItemsAsync')
      return action.payload
    })
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectItems = (state: RootState) => state.items


// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default userSlice.reducer;
