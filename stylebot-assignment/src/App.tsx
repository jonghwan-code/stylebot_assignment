import { useRef } from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookmarkImages } from "./pages/BookmarkImages";
import SearchImages from "./pages/SearchImages";

function App() {
  const inputRef = useRef<string>("");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<SearchImages inputRef={inputRef} />} />
          <Route path="bookmark" element={<BookmarkImages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
