import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-root">
        <h1>Holix AI — React 已就绪</h1>
        <p>这是一个最小的 React + TypeScript 入口示例。</p>
        <Button size="lg">点击我</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}
