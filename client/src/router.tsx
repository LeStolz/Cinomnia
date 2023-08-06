import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { NavbarLayout } from "./layouts/NavbarLayout";
import { Home } from "./pages/Home/Home";
import { Store } from "./pages/Store/Store";
import { About } from "./pages/About/About";
import { Search } from "./components/Search/Search";
import { AuthProvider } from "./contexts/AuthContext";
import { Player } from "./components/Player/Player";
import { CastDetail } from "./pages/CastDetail/CastDetail";

        
import { FilmDetail } from "./pages/FilmDetail/FilmDetail";
        
import { WatchHistory } from "./pages/WatchHistory/WatchHistory";

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
          { path: "about", element: <About /> },

          { path: "castDetail", element: <CastDetail /> },
=======

        
          { path: "film_detail", element: <FilmDetail /> },
=======
        
          { path: "watch_history", element: <WatchHistory /> },
          { path: "player", element: <Player/>},
=======

          { path: "search", element: <Search/>},
=======

        ],
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
