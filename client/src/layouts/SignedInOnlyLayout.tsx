import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export function SignedInOnlyLayout({ adminOnly }: any) {
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);

  return (
    <>
      {user !== undefined &&
        (user === null ? (
          <Navigate to="/signin" />
        ) : (adminOnly && user?.type === "admin") || !adminOnly ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        ))}
    </>
  );
}
