import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { fetchProductsLoader } from "./pages/Home";
import Auth, { action as authAction } from "./pages/Auth";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Shop from "./pages/Shop";
import ProductDetails, { fetchProductDetailsLoader } from "./pages/ProductDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import CommonBannerLayout from "./components/BannerLayout";

// Define the custom loader for the Home page with limit set to 8
const homeLoader = ({ request }) => fetchProductsLoader({ request, limit: 8 });
// Define the custom loader for the Shop page with limit set to 16
const shopLoader = ({ request }) => fetchProductsLoader({ request, limit: 16 });

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
            loader: shopLoader,

          },
          {
            path: "shop/:productId",
            element: <ProductDetails />,
            loader: fetchProductDetailsLoader
          },
        ],
      },
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
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
