import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Shop from "./pages/Shop";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<div>Einstellungen</div>} />
        <Route path="/help" element={<div>Hilfe</div>} />
      </Routes>
    </>
  );
}
export default App;
