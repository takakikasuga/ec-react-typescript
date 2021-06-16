import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchItems } from '../../types/items/items'
import firebase from 'firebase'

const initialState: string = ''

export const statusZoroIdAsync = createAsyncThunk('statusZoro/statusZoroIdAsync', async (userId: string) => {
  let uniqueId = ''
  const ordersRef =
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('orders');
  // statusが0のもをFirestoreから引っ張ってくる
  await ordersRef
    .where('status', '==', 0)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        uniqueId = doc.id
      })
    })
    .catch((error) => {
      console.log(error)
    });
  console.log(uniqueId)
  return uniqueId
});

export const statusZoroIdSlice = createSlice({
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
    builder.addCase(statusZoroIdAsync.fulfilled, (state, action: any) => {
      console.log(state)
      console.log(action)
      console.log('statusZoroIdAsync')
      return action.payload
    })
  },
});


export const selectStatusZoroId = (state: RootState) => state.statusZoroId

export default statusZoroIdSlice.reducer;
