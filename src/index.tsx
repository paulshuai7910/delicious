import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ); // 假设你有一个名为App的React组件
} else {
  console.error('Element with id "root" not found');
  // 你可以在这里添加其他错误处理逻辑
}
