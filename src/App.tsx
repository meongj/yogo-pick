import "./App.css";
import {Route, Routes} from "react-router-dom";
import CreateBowlPage from "./pages/CreateBowlPage";
import BowlCardListPage from "./pages/BowlCardListPage";
import BowlDetailPage from "./pages/BowlDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateBowlPage />} />
      <Route path="/album" element={<BowlCardListPage />} />
      <Route path="/detail" element={<BowlDetailPage />} />
    </Routes>
  );
}

export default App;
