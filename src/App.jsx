import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import NewArticle from "./pages/NewArticle";
import MyArticles from "./pages/MyArticles";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import SingleArticle from "./pages/SingleArticle";
import Profile from "./pages/Profile";

export default function App() {
  const { user } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "newArticle",
          element: user ? <NewArticle /> : <Navigate to="/register" />,
        },
        {
          path: "myArticles",
          element: user ? <MyArticles /> : <Navigate to="/register" />,
        },
        {
          path: "singleArticle/:id",
          element: <SingleArticle />,
        },
        {
          path: "myArticles/singleArticle/:id",
          element: <SingleArticle />,
        },
        {
          path: "/profile",
          element: user ? <Profile /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
