import "./App.css";
import {Route, Routes} from "react-router-dom";
import CreateBowlPage from "./pages/CreateBowlPage";
import BowlCardListPage from "./pages/BowlCardListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateBowlPage />} />
      <Route path="/album" element={<BowlCardListPage />} />
    </Routes>
  );
}

export default App;
