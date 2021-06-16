import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
// import { fetchCount } from './counterAPI';
import firebase from 'firebase'
import { strage } from '../../firebase/firebase.js'
import { providerGoogle } from '../../firebase/firebase'

import axios from 'axios'



const initialState: any = null

let fetchItemsData: any = null

export const uploadItemData = createAsyncThunk('uploadData/uploadItemDataAsync', async (object: any) => {
  console.log('uploadItemDataAsync')
  console.log(object)
  function authStorage() {
    const uploadTask = strage.ref(`images/${object.image.name}`).put(object.image);
    return new Promise(resolve => {
      uploadTask.on(
        "state_changed",
        snapshot => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // )
          // setProgress(progress)
        },
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
              // setProgress(0)
              // let itemObject = {
              //   imagePath: image,
              //   name: name,
              //   description: description,
              //   price: {
              //     m: price_m,
              //     l: price_l,
              //   }
              // }
            })
        }
      )
      resolve('')
    })
  }
  console.log('await直前')
  await authStorage()
  console.log('await直後')
  return fetchItemsData
});

export const registerUserInfoAsync = createAsyncThunk('register/registerUserInfo', async () => {
  // firebase.auth().onAuthStateChangedはPromiseを返却しないため明示的にPromiseを返すようにしている
  function auth() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('firebaseの通信を行っています。')
        if (user) {
          userStatus.userId = user.uid
          userStatus.userName = user.displayName
        }
        // Promiseで成功を返却する
        resolve(userStatus)
      })
    })
  }
  await auth()
  console.log('registerUserInfoAsync')
  return userStatus
});

export const signOutUserInfoAsync = createAsyncThunk('signOut/signOutUserInfo', async () => {
  await firebase.auth().signOut()
  return initialState
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
