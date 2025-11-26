import { Route, Routes } from "react-router-dom";
import CreateBowlPage from "./pages/CreateBowlPage";
import BowlCardListPage from "./pages/BowlCardListPage";
import BowlDetailPage from "./pages/BowlDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/create" element={<CreateBowlPage />} />
      <Route path="/album" element={<BowlCardListPage />} />
      <Route path="/detail/:id" element={<BowlDetailPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
