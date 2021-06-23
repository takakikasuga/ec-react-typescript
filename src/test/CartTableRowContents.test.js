import React from "react"
import { render, cleanup, screen } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import { TableRowContents } from "../components/organisums/tableCart/TableRowContents"
import { store } from "../app/store"
import { Provider } from "react-redux"
import renderer from 'react-test-renderer';


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

  describe("jest renderer test", () => {
    test("render correctly", () => {
      const tree = renderer
        .create(<Provider store={store}>
          <TableRowContents row={row} />
        </Provider>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    })
  })
  describe("cartリストのrowコンテンツの確認", () => {
    test("rowコンテンツの金額が3000円であることの表示確認（パターン１）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      // 完全一致パターン
      expect(screen.getByTestId("price")).toHaveTextContent(/^3,000円$/)
    })
    test("rowコンテンツの金額が3000円であることの表示確認（パターン２）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      // textContentはDOM要素のtextContentにアクセス
      expect(screen.getByTestId("price").textContent).toBe("3,000円")
    })
    test("rowコンテンツの金額が3000円であることの表示確認（パターン３）", () => {
      // screen.debug()
      screen.debug(screen.getByTestId("price"))
      // .toBeInTheDocumentはDOM要素があるか否かの確認
      expect(screen.getByTestId("price")).toBeInTheDocument()
    })
    test("rowコンテンツの個数が3個であることの表示確認", () => {
      screen.debug()
      screen.debug(screen.getByTestId("count"))
      expect(screen.getByTestId("count").innerHTML).toBe("3個")
    })
    test("rowコンテンツに存在するtdタグの数をテスト", () => {
      expect(screen.getAllByRole("cell")).toHaveLength(5)
    })
  })
})