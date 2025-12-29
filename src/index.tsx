import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/root.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// const sse = new EventSource("holix://app/channel");

// sse.addEventListener("message", (event) => {
//   console.log("Received message:", event.data);
// })

// sse.addEventListener("error", (event) => {
//   console.error("SSE error:", event);
// })

// sse.addEventListener("open", (event) => {
//   console.log("SSE connection opened.", event);
// })