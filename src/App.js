import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BasicLayout from "./components/BasicLayout";
import BlogArticle from "./pages/BlogArticle";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BasicLayout>
              <Outlet />
            </BasicLayout>
          }
        >
          <Route index={true} element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
