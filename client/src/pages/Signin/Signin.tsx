import { SigninView } from "./SigninView";
import { useAuth } from "../../contexts/AuthContext";

export type SigninViewProps = {
  onSubmit: (
    user: { email: string | undefined },
    remember: boolean | undefined
  ) => void;
  onSubmitGoogle: () => void;
};

export type SigninModelProps = {};

export function Signin() {
  const { signin, signinWithGoogle } = useAuth();

  const onSubmit = async (
    user: { email: string | undefined },
    remember: boolean | undefined
  ) => {
    try {
      if (user.email == null) {
        throw new Error("Email is required");
      }

      await signin({ email: user.email }, remember || false);
    } catch (err) {
      throw err;
    }
  };

  const onSubmitGoogle = async () => {
    try {
      await signinWithGoogle();
    } catch (err) {
      throw err;
    }
  };

  return <SigninView onSubmit={onSubmit} onSubmitGoogle={onSubmitGoogle} />;
}
