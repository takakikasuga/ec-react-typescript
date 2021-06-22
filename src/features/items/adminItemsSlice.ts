import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'

// 型のインポート
import { FetchAdminItems, AdminItems } from "../../types/admin/adminItems"


const initialState: FetchAdminItems = {}

export const fetchAdminItemsAsync = createAsyncThunk('fetchAdminItems/fetchAdminItemsAsync', async () => {
  // 通信ごとに配列の中身をか空にする
  let fetchAdminItemsData: FetchAdminItems = {
    adminItems: []
  }
  await firebase
    .firestore()
    .collection(`items/`)
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      snapshot.forEach((element: firebase.firestore.DocumentData) => {
        let data = element.data()
        data.uniqueId = element.id
        fetchAdminItemsData!.adminItems!.push(data)
      });
    })

  // アイテムidを昇順へと並び替える
  fetchAdminItemsData!.adminItems!.sort(function (first: AdminItems, second: AdminItems) {
    if (first.id! < second.id!) {
      return -1;
    } else {
      return 1;
    }
  });
  return fetchAdminItemsData
});

export const updateAdminItemsAsync = createAsyncThunk('updateAdminItems/updateAdminItemsAsync', async (uniqueId: string) => {
  // 通信ごとに配列の中身をか空にする
  await firebase
    .firestore()
    .collection(`items/`)
    .doc(uniqueId)
    .delete()
    .then(() => {
      console.log("削除に成功しました")
    })
  return uniqueId
});


export const adminItemsSlice = createSlice({
  name: 'adminItems',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // fetchAdminItemsAsyncの非同期通信だった時
    builder.addCase(fetchAdminItemsAsync.fulfilled, (state, action: PayloadAction<FetchAdminItems>) => {
      return action.payload
    })
    // updateAdminItemsの非同期通信だった時
    builder.addCase(updateAdminItemsAsync.fulfilled, (state, action: any) => {
      // 削除対象の一意のインデックスを取得
      let deleteIndex: number | undefined = state.adminItems?.findIndex((element) => {
        return action.payload === element.uniqueId
      })
      if (typeof deleteIndex === "number") {
        state.adminItems?.splice(deleteIndex, 1)
      }
      return state
    })
  },
});

export const selectAdminItems = (state: RootState) => state.adminItems

export default adminItemsSlice.reducer;
