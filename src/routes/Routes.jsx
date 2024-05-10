
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/addBook',
            element: <AddBook></AddBook>
        },
        {
            path: '/allBooks',
            element: <AllBooks></AllBooks>
        },
        {
            path: '/borrowedBooks',
            element: <BorrowedBooks></BorrowedBooks>
        },
      ]
    },
  ]);

  export default router;