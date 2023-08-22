import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { NavbarLayout } from "./layouts/NavbarLayout";
import { Home } from "./pages/Home/Home";
import { Store } from "./pages/Store/Store";
import { About } from "./pages/About/About";
import { Payment } from "./components/Payment/Payment";
import { PaymentNotification } from "./components/Payment/PaymentNotification";
import { Search } from "./components/Search/Search";
import { AuthProvider } from "./contexts/AuthContext";
import { CastDetail } from "./pages/CastDetail/CastDetail";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { FilmDetail } from "./pages/FilmDetail/FilmDetail";
import { WatchHistory } from "./pages/WatchHistory/WatchHistory";
import { Player } from "./pages/Player/Player";
import { Filter } from "./pages/Filter/Filter";
import { NormalNavbarLayout } from "./layouts/NormalNavbarLayout";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
      {
        element: <NavbarLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "store", element: <Store /> },
          { path: "payment", element: <Payment /> },
          { path: "successful", element: <PaymentNotification /> },
          { path: "castDetail", element: <CastDetail /> },
          { path: "watch_history", element: <WatchHistory /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "search/:search", element: <Search /> },
          { path: "player/:id", element: <Player /> },
          { path: "detail/:id", element: <FilmDetail /> },
          { path: "filter", element: <Filter /> },
        ],
      },
      {
        element: <NormalNavbarLayout />,
        children: [{ path: "about", element: <About /> }],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
