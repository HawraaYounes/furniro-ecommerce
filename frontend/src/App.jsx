import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth, { action as authAction } from "./pages/Auth";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import CommonBannerLayout from "./components/BannerLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <CommonBannerLayout />,
        children: [
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "shop/:productId",
            element: <ProductDetails />,
          },
        ],
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
        action: authAction,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
