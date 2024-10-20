import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ImageGrid from "./Components/ImageGrid/ImageGrid";
import ImageUpload from "./Components/ImageUpload/ImageUpload";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageGrid />} />
          <Route path="/admin/upload" element={<ImageUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
