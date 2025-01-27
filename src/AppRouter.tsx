import { createBrowserRouter, Navigate } from "react-router-dom";

import { Homepage } from "./pages/homepage/Homepage";
import Layout from "./Layout";
import Productpage from "./pages/productpage/Productpage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/clothes" />, // Redirect to /clothes
      },
      {
        path: "/:path",
        element: <Homepage />,
      },
      {
        path: "/product/:id",
        element: <Productpage />,
      },
    ],
  },
]);

export default AppRouter;
