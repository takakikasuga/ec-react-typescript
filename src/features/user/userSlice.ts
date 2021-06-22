import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { UserStatus } from '../../types/userStatus/userStatus'
// import { fetchCount } from './counterAPI';
import firebase from 'firebase'
import { strage } from '../../firebase/firebase.js'
import { providerGoogle } from '../../firebase/firebase'



const initialState: UserStatus = {
  userId: null,
  userName: null,
};

let userStatus: UserStatus = {
  userId: null,
  userName: null,
}

export const loginUserAsync = createAsyncThunk('login/loginUserAsync', async () => {
  await firebase.auth().signInWithRedirect(providerGoogle);
  // await firebase.auth().getRedirectResult();
  return initialState
});

export const registerUserInfoAsync = createAsyncThunk('register/registerUserInfo', async () => {
  // firebase.auth().onAuthStateChangedはPromiseを返却しないため明示的にPromiseを返すようにしている
  function auth() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged((user) => {
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
  return userStatus
});

export const signOutUserInfoAsync = createAsyncThunk('signOut/signOutUserInfo', async () => {
  await firebase.auth().signOut()
  // デフォルトに戻す
  return initialState
});

export const userSlice = createSlice({
  name: 'userStatus',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // loginUserAsyncの非同期通信だった時
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return initialState
    })

    // registerUserInfoAsyncの非同期通信だった時
    builder.addCase(registerUserInfoAsync.fulfilled, (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
      }
    })
    // signOutUserInfoAsyncの非同期通信だった時
    builder.addCase(signOutUserInfoAsync.fulfilled, (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
      }
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectUserId = (state: RootState) => state.user.userId;

export const selectUserName = (state: RootState) => state.user.userName;

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
