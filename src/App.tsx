import { Route, Routes } from "react-router-dom";
import CreateBowlPage from "./pages/CreateBowlPage";
import BowlCardListPage from "./pages/BowlCardListPage";
import BowlDetailPage from "./pages/BowlDetailPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateBowlPage />} />
      <Route path="/album" element={<BowlCardListPage />} />
      <Route path="/detail/:id" element={<BowlDetailPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
