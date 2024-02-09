import BooksData from "./components/BooksData";
import Registration from "./components/Registration";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<BooksData />}></Route>
        <Route path="/register" element={<Registration />}></Route>
      </Routes>
    </>
  );
}

export default App;