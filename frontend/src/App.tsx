import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import TopBar from "./components/TopBar";
import Library from "./pages/Library";
import { Routes, Route } from "react-router-dom";

function ShopPage() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>ArcadeX</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
      </section>
    </>
  );
}
function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<div>Einstellungen</div>} />
        <Route path="/help" element={<div>Hilfe</div>} />
      </Routes>
    </>
  );
}
export default App;
