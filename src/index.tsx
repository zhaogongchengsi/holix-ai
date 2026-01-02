import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/root.css";
import useChat from "./store/chat";

const chats = useChat.getState().chats;

console.log("Available chats on startup:", chats);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
