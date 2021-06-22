import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

// 型のインポート
import { AdminItems } from "../../types/admin/adminItems"

// Firebase関連
import firebase from 'firebase'
import { strage } from '../../firebase/firebase.js'


const initialState: Array<AdminItems> = []


export const fetchUploadItemData = createAsyncThunk('fetchUploadItemData/fetchUploadItemDataAsync', async () => {
  let fetchUploadItemData: Array<AdminItems> = []
  await firebase
    .firestore()
    .collection(`items`)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        fetchUploadItemData.push(doc.data())
      })
    })

  // アイテムidを昇順へと並び替える
  fetchUploadItemData!.sort(function (first: AdminItems, second: AdminItems) {
    if (first.id! < second.id!) {
      return -1;
    } else {
      return 1;
    }
  });

  return fetchUploadItemData
});

export const uploadItemDataAsync = createAsyncThunk('uploadData/uploadItemDataAsync', async (object: any) => {
  let itemObject: AdminItems = {
    id: null,
    imagePath: null,
    name: null,
    description: null,
    price: {
      m: null,
      l: null,
    }
  }
  // 上記変数オブジェクトに代入
  itemObject.id = object.id
  itemObject.name = object.name
  itemObject.description = object.description
  itemObject.price!.m = Number(object.price.m)
  itemObject.price!.l = Number(object.price.l)

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
          strage
            .ref("images")
            .child(object.image.name)
            .getDownloadURL()
            .then((url) => {
              itemObject.imagePath = url
              // Promiseで成功を返却する
              resolve('')
            })
        })
    })
  }
  // uploadTaskはPromiseを返却しないので、明示的に返却されるようPromiseを使用する
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
  return itemObject
});

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // loginUserAsyncの非同期通信だった時
    builder.addCase(uploadItemDataAsync.fulfilled, (state, action: PayloadAction<AdminItems>) => {
      // 既存のstateにpushして配列の中身の情報をローカルで更新する
      state.push(action.payload)
      return state
    })
    builder.addCase(fetchUploadItemData.fulfilled, (state, action: any) => {
      return action.payload
    })
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectAdmin = (state: RootState) => state.admin

export default adminSlice.reducer;
