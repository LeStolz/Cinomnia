import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { Signin } from "./pages/Signin/Signin";
import { NavbarLayout } from "./layouts/NavbarLayout";
import { Home } from "./pages/Home/Home";
import { Store } from "./pages/Store/Store";
import { About } from "./pages/About/About";
import { Payment } from "./components/Payment/Payment";
import { PaymentNotification } from "./components/Payment/PaymentNotification";
import { Search } from "./components/Search/Search";
import { AuthProvider } from "./contexts/AuthContext";
import { CastDetail } from "./pages/CastDetail/CastDetail";
import { MyList } from "./pages/MyList/MyList";
import { FilmDetail } from "./pages/FilmDetail/FilmDetail";
import { Player } from "./pages/Player/Player";
import { Filter } from "./pages/Filter/Filter";
import { SignedInOnlyLayout } from "./layouts/SignedInOnlyLayout";
import { NotFound } from "./components/NotFound";
import { Account } from "./pages/Account/Account";
import { FilmProvider } from "./contexts/FilmContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { FilmCrud } from "./pages/FilmCrud/FilmCrud";
import { GenreCrud } from "./pages/GenreCrud/GenreCrud";
import { UserCrud } from "./pages/UserCrud/UserCrud";
import ScrollToTop from "./components/ScrollToTop";
import { FilmUpdate } from "./pages/FilmUpdate/FilmUpdate";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: "signin", element: <Signin /> }],
      },
      {
        element: <SignedInOnlyLayout />,
        children: [
          {
            element: <NavbarLayout fade={true} />,
            children: [{ path: "", element: <Home /> }],
          },
          {
            element: <NavbarLayout fade={false} />,
            children: [
              { path: "store", element: <Store /> },
              { path: "about", element: <About /> },
              { path: "payment", element: <Payment /> },
              { path: "successful", element: <PaymentNotification /> },
              { path: "cast-detail", element: <CastDetail /> },
              { path: "wishlist", element: <MyList /> },
              { path: "search/:search", element: <Search /> },
              { path: "player/:id", element: <Player /> },
              { path: "detail/:id", element: <FilmDetail /> },
              { path: "filter", element: <Filter /> },
              { path: "account", element: <Account /> },
            ],
          },
        ],
      },
      {
        element: <SignedInOnlyLayout adminOnly />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <Navigate to="film-crud" />,
              },
              { path: "dashboard/film-crud", element: <FilmCrud /> },
              { path: "dashboard/user-crud", element: <UserCrud /> },
              { path: "dashboard/genre-crud", element: <GenreCrud /> },
            ],
          },
          {
            element: <NavbarLayout fade={false} />,
            children: [
              { path: "film-update/:id", element: <FilmUpdate /> },
              { path: "film-update", element: <FilmUpdate /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <FilmProvider>
          <Outlet />
        </FilmProvider>
      </AuthProvider>
    </>
  );
}
