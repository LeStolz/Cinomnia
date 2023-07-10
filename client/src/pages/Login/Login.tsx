import { LoginView } from "./LoginView"
import { LoginModel } from "./LoginModel";

export type LoginViewProps = {
  onSubmit: (user: {
    email: string | undefined;
  }) => void;
};

export type LoginModelProps = {
  email: string | undefined;
};

export function Login() {
  const onSubmit = async (user: LoginModelProps) => {
    const model = new LoginModel();

    try {
      await model.login(user);
    } catch (err) {
      console.log(err);
    }
  };

  return <LoginView onSubmit={onSubmit} />;
}