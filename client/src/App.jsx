import "./index.css";
import Routes from "./routes";
import ThemeSwitcher from "./components/common/ThemeSwitcherBtn";

function App() {
  return (
    <div>
      <div className="hidden">
        <ThemeSwitcher />
      </div>
      <Routes />
    </div>
  );
}

export default App;
