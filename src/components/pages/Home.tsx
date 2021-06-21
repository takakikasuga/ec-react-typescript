import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// 管理者IDのインポート
import { AdminIdTest } from "../../admin/admin"

// 機能のインポート
import { selectUserId } from "../../features/user/userSlice"

// コンポーネント
import { Header } from '../organisums/header/Header'
import { Items } from '../organisums/itemLists/Items'


export const Home = () => {
  const history = useHistory()
  const userId = useSelector(selectUserId)

  useEffect(() => {
    // 管理者がログインした場合は、管理者画面に
    if (userId === AdminIdTest) {
      history.push("/admin")
    }
  }, [userId])

  return (
    <>
      <Header></Header>
      <Items></Items>
    </>
  )
}
