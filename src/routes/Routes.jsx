
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/addBook',
            element: <PrivateRoutes><AddBook></AddBook></PrivateRoutes>
        },
        {
            path: '/allBooks',
            element: <PrivateRoutes><AllBooks></AllBooks></PrivateRoutes>,
        },
        {
            path: '/borrowedBooks',
            element: <PrivateRoutes><BorrowedBooks></BorrowedBooks></PrivateRoutes>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
      ]
    },
  ]);

  export default router;