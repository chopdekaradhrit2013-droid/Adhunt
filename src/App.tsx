import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandPage from "./pages/BrandPage";
import Apply from "./pages/Apply";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import CursorRing from "./components/CursorRing";

export default function App() {
  return (
    <>
      <CursorRing />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/b/:slug" element={<BrandPage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
