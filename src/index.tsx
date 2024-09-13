import React, { Profiler } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const rootElement = document.getElementById("root")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  const onRender = (id: any, phase: any, actualDuration: any) => {
    console.log(
      `Rendered ${id} in phase ${phase} with duration ${actualDuration} ms`
    )
  }

  root.render(
    <React.StrictMode>
      <Profiler id="Sidebar" onRender={onRender}>
        <App />
      </Profiler>
    </React.StrictMode>
  ) // 假设你有一个名为App的React组件
} else {
  console.error('Element with id "root" not found')
  // 你可以在这里添加其他错误处理逻辑
}
