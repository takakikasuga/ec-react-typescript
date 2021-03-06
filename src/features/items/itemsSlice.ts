import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items';
import firebase from 'firebase';

const initialState: Array<fetchItems> = [];

export const fetchItemsAsync = createAsyncThunk(
  'items/fetchItemsAsync',
  async () => {
    // 通信ごとに配列の中身をか空にする
    let fetchItemsData: Array<fetchItems> = [];
    await firebase
      .firestore()
      .collection(`items/`)
      .get()
      .then(
        (
          snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        ) => {
          snapshot.forEach((element: firebase.firestore.DocumentData) => {
            fetchItemsData.push(element.data());
          });
        }
      );

    // アイテムidを昇順へと並び替える
    fetchItemsData.sort(function (first: fetchItems, second: fetchItems) {
      if (first.id! < second.id!) {
        return -1;
      } else {
        return 1;
      }
    });
    return fetchItemsData;
  }
);

export const searchItemsAsync = createAsyncThunk(
  'searchItem/searchItemsAsync',
  async (itemIndex: string) => {
    let searchItemsData: Array<fetchItems> = [];
    // // 通信ごとに配列の中身をか空にする
    await firebase
      .firestore()
      .collection(`items/`)
      .get()
      .then(
        (
          snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        ) => {
          snapshot.forEach((element: firebase.firestore.DocumentData) => {
            searchItemsData.push(element.data());
          });
        }
      );

    let hitItems: Array<fetchItems> = [];
    // 検索ワードを基準に古いにかける
    searchItemsData.forEach((element) => {
      // 検索条件に一致しない場合（indexOf === -1）
      if (element.name!.indexOf(itemIndex) !== -1) {
        hitItems.push(element);
      }
    });

    // アイテムidを昇順へと並び替える
    hitItems.sort(function (first: fetchItems, second: fetchItems) {
      if (first.id! < second.id!) {
        return -1;
      } else {
        return 1;
      }
    });
    return hitItems;
  }
);

export const signOutUserInfoAsync = createAsyncThunk(
  'signOut/signOutUserInfo',
  async () => {
    await firebase.auth().signOut();
    return initialState;
  }
);

export const userSlice = createSlice({
  name: 'items',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // loginUserAsyncの非同期通信だった時
    builder.addCase(
      fetchItemsAsync.fulfilled,
      (state, action: PayloadAction<Array<fetchItems>>) => {
        return action.payload;
      }
    );
    builder.addCase(
      searchItemsAsync.fulfilled,
      (state, action: PayloadAction<Array<fetchItems>>) => {
        return action.payload;
      }
    );
  },
});

export const selectItems = (state: RootState) => state.items;

export default userSlice.reducer;
