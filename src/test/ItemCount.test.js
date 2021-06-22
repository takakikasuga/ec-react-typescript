import React from "react"
import { render, cleanup, screen, fireEvent, waitFor } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import userEvent from "@testing-library/user-event"
import { ItemCount } from "../components/organisums/count/ItemCount"
import { store } from "../app/store"
import { Provider } from "react-redux"


describe("DetailのItemCountコンポーネント", () => {

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup())

  describe.only("ItemCountコンポーネントで表示テスト", () => {
    test("要素出現の確認", () => {
      render(
        <Provider store={store}>
          <ItemCount />
        </Provider>
      )
      screen.debug()
      screen.debug(screen.getByTestId("itemCountTest"))
      // 数量を選択をクリックしたら別のコンポーネントが出現
      userEvent.click(screen.getByTestId("itemCountTest"))
      screen.debug()
      expect(screen.getByTestId("itemCountTestSuprise")).toBeTruthy()
    })
  })
})