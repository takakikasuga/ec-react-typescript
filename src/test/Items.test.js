import React from "react"
import { render, cleanup, screen, fireEvent, waitFor } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import userEvent from "@testing-library/user-event"
import { Items } from "../components/organisums/itemLists/Items"
import { store } from "../app/store"
import { Provider } from "react-redux"


describe("Itemsコンポーネント", () => {

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup())

  afterEach(cleanup)

  // 各テストの直前に実行される（コンポーネントの取得）
  // beforeEach(() => {
  //   render(
  //     <Provider store={store}>
  //       <Items />
  //     </Provider>
  //   )
  // })

  describe("特定の文字列を含んでいるか否かの確認", () => {
    test("グローバルのアイテム情報を取得した場合に表示される「詳細」という文字列が初回レンダリング時には存在しないこと", () => {
      // この要素がないことを確かめる
      expect(screen.queryByText(/詳細/)).toBeNull()
    })
    test("グローバルのアイテム情報を取得した場合に表示される「商品一覧へ」という文字列が初回レンダリング時には存在すること", () => {
      // スクリーンオブジェクトでテキストを取得する
      screen.getByText("商品一覧へ")
      expect(screen.getByText("商品一覧へ")).toBeInTheDocument()
    })
    test("いかなる状況下でも「Searches for JavaScript」という文字列が存在しないこと", () => {
      // スクリーンオブジェクトでテキストを取得する
      // HTMLタグで取得して、その中身の存在を確認する
      expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    })
  })
  // .only修飾子で１つのみ実行する
  describe("指定したHTMLタグが存在するか否かの確認", () => {
    // test("buttonタグを取得して、type属性が含まれているかの確認", () => {
    //   expect(screen.getByRole("button")).toHaveAttribute("type")
    // })
    test("buttonタグを取得してその中に文字列が含まれているかの確認", () => {
      // スクリーンオブジェクトでテキストを取得する
      // HTMLタグで取得して、その中身の存在wを確認する
      expect(screen.getByRole("button")).toBeInTheDocument()
      screen.debug()
    })
    test("h1タグを取得してその中に文字列が含まれているかの確認", () => {
      // スクリーンオブジェクトでテキストを取得する
      // HTMLタグで取得して、その中身の存在を確認する
      expect(screen.getByRole("heading")).toBeInTheDocument()
      // screen.debug()
    })
  })
  describe("指定したHTMLタグが要素数を確認", () => {
    test("buttonタグの数を確認（特定数）", () => {
      expect(screen.getAllByRole("button")).toHaveLength(1);
    })
  })
  describe("レンダリングされているかを確認", () => {
    test("全ての要素が正しくレンダリングされているのか否か", () => {
      screen.debug()
      expect(screen.getAllByRole("button")).toBeTruthy();
    })
  })
  describe("レンダリングされているかを確認", () => {
    test(" 関数が発火しているか否か", () => {

      const outputConsole = jest.fn()
      // 関数が発火しているか否か
      render(
        <Provider store={store}>
          <Items outputConsole={outputConsole} />
        </Provider>
      )
      // screen.debug()
      userEvent.click(screen.getByRole("button"))
      expect(outputConsole).toHaveBeenCalled()
    })
  })
  describe.only("レンダリングされているかを確認", () => {
    test("data-testidを使った発火テスト", () => {

      const outputConsole = jest.fn()
      // 関数が発火しているか否か
      render(
        <Provider store={store}>
          <Items outputConsole={outputConsole} />
        </Provider>
      )
      screen.debug()
      userEvent.click(screen.getByTestId("発火テスト"))
      expect(outputConsole).toHaveBeenCalled()
    })
  })
})