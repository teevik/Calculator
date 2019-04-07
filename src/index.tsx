import { configure } from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App"

configure({
  enforceActions: "always"
})

ReactDOM.render(<App />, document.getElementById("root"))
