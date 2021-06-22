import React from "react"
import { render, cleanup, screen, fireEvent, waitFor } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import userEvent from "@testing-library/user-event"
import { RadioButton } from "../components/organisums/radio/RadioButton"
import { store } from "../app/store"
import { Provider } from "react-redux"


describe("RadioButtonコンポーネント", () => {

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup())

  describe.only("料金の表示金額", () => {
    test("Mサイズの料金の表示確認", () => {
      // この要素がないことを確かめる
      let detail = {
        price: {
          m: 100,
          l: 200
        }
      }
      render(
        <Provider store={store}>
          <RadioButton detail={detail} />
        </Provider>
      )
      // screen.debug()
      expect(screen.getByTestId('mPrice')).toBeInTheDocument()
    })
    test("Lサイズの料金の表示確認", () => {
      // この要素がないことを確かめる
      let detail = {
        price: {
          m: 100,
          l: 200
        }
      }
      render(
        <Provider store={store}>
          <RadioButton detail={detail} />
        </Provider>
      )
      // screen.debug()
      expect(screen.getByTestId('lPrice')).toBeInTheDocument()
    })
  })
})