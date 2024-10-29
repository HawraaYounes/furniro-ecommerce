import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth, { action as authAction } from "./pages/Auth";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
        action: authAction,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:productId",
        element: <ProductDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
