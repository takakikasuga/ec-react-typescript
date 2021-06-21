import React from "react"
import { render, cleanup, screen } from "@testing-library/react"
import { afterEach, expect } from "@jest/globals"
import { Items } from "./Items"
import { store } from "../../../app/store"
import { Provider } from "react-redux"

afterEach(() => cleanup())

describe("confirm item list", () => {
  test("confirm no item list", () => {
    render(
      <Provider store={store}>
        <Items />
      </Provider>
    )
    expect(screen.queryByText(/詳細へ/)).toBeNull()
  })
  test("find button icon", async () => {
    render(
      <Provider store={store}>
        <Items />
      </Provider>
    )
    expect(screen.getByRole("button")).toHaveAttribute("type")
    // expect(await screen.getByRole("button")).toHaveAttribute("type")
  })
})