import { SignupView } from "./SignupView";
import { SignupModel } from "./SignupModel";

export type SignupViewProps = {
  onSubmit: (user: {
    email: string | undefined;
    password: string | undefined;
  }) => void;
};

export type SignupModelProps = {
  email: string | undefined;
  password: string | undefined;
};

export function Signup() {
  const onSubmit = async (user: SignupModelProps) => {
    const model = new SignupModel();

    try {
      await model.signup(user);
    } catch (err) {
      console.log(err);
    }
  };

  return <SignupView onSubmit={onSubmit} />;
}
