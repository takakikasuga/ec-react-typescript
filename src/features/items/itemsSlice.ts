import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'



const initialState: Array<fetchItems> = []

let fetchItemsData: Array<fetchItems> = []

export const fetchItemsAsync = createAsyncThunk('items/fetchItemsAsync', async () => {
  // 通信ごとに配列の中身をか空にする
  // fetchItemsData.length = 0
  await firebase
    .firestore()
    .collection(`Items/`)
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

export const searchItemsAsync = createAsyncThunk('searchItem/searchItemsAsync', async (itemIndex: string) => {
  let searchItemsData: Array<fetchItems> = []
  // // 通信ごとに配列の中身をか空にする
  await firebase
    .firestore()
    .collection(`Items/`)
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      console.log("Firebase通信に成功しました。")
      snapshot.forEach((element: firebase.firestore.DocumentData) => {
        console.log("発火１")
        searchItemsData.push(element.data())
        console.log("発火２")
      });
    })

  let hitItems: Array<fetchItems> = []
  // 検索ワードを基準に古いにかける
  console.log(searchItemsData)
  searchItemsData.forEach((element) => {
    // 検索条件に一致しない場合（indexOf === -1）
    if (element.name!.indexOf(itemIndex) !== -1) {
      console.log("一致する商品名", element.name)
      hitItems.push(element)
    }
  })
  console.log(itemIndex)
  console.log("検索条件にヒットした商品一覧", hitItems)

  // アイテムidを昇順へと並び替える
  hitItems.sort(function (first: fetchItems, second: fetchItems) {
    if (first.id! < second.id!) {
      return -1;
    } else {
      return 1;
    }
  });

  console.log(hitItems)
  return hitItems
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
      console.log('fetchItemsAsync')
      return action.payload
    })
    builder.addCase(searchItemsAsync.fulfilled, (state, action: PayloadAction<Array<fetchItems>>) => {
      return action.payload
    })
  },
});

export const selectItems = (state: RootState) => state.items

export default userSlice.reducer;
