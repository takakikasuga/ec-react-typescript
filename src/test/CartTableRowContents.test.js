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

  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <TableRowContents row={row} />
      </Provider>
    )
  })


  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup())

  describe.only("cartリストのrowコンテンツの確認", () => {
    test("rowコンテンツの金額が3000円であることの表示確認（パターン１）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      expect(screen.getByTestId("price")).toBeInTheDocument("3,000円")
    })
    test("rowコンテンツの金額が3000円であることの表示確認（パターン２）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      expect(screen.getByTestId("price").textContent).toBe("3,000円")
    })
    test("rowコンテンツの金額が3000円であることの表示確認（パターン３）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      expect(screen.getByTestId("price")).toHaveTextContent("3,000円")
    })
    test("rowコンテンツの個数が3個であることの表示確認", () => {
      screen.debug()
      screen.debug(screen.getByTestId("count"))

      expect(screen.getByTestId("count")).toBeInTheDocument("3個")
    })
    test("rowコンテンツに存在するtdタグの数をテスト", () => {
      expect(screen.getAllByRole("cell")).toHaveLength(5)
    })
  })
})