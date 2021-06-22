import React from "react"
import { render, cleanup, screen, fireEvent, waitFor } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import userEvent from "@testing-library/user-event"
import { TableRowContents } from "../components/organisums/tableCart/TableRowContents"
import { store } from "../app/store"
import { Provider } from "react-redux"


describe("CartリストのTableRowContentsコンポーネント", () => {

  // ダミーデータ
  const row = {
    itemPrice: 3000,
    itemCount: 3,
  }

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup())

  describe.only("cartリストのrowコンテンツの確認", () => {
    test("rowコンテンツの金額が3000円であることの表示確認", () => {
      render(
        <Provider store={store}>
          <TableRowContents row={row} />
        </Provider>
      )
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      expect(screen.getByTestId("price")).toBeInTheDocument("3,000円")
    })
    test("rowコンテンツの個数が3個であることの表示確認", () => {
      render(
        <Provider store={store}>
          <TableRowContents row={row} />
        </Provider>
      )
      screen.debug()
      screen.debug(screen.getByTestId("count"))

      expect(screen.getByTestId("count")).toBeInTheDocument("3個")
    })
    test("rowコンテンツに存在するtdタグの数をテスト", () => {
      render(
        <Provider store={store}>
          <TableRowContents row={row} />
        </Provider>
      )
      expect(screen.getAllByRole("cell")).toHaveLength(5)
    })
  })
})