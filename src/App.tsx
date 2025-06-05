import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Detail from "./pages/Detail";
import Main from "./pages/main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/place/:shopid" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
