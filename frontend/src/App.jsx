import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth, { action as authAction } from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
    action: authAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
