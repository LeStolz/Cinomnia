import { SignupModelProps } from "./Signup";
import { useAuth } from "../../contexts/AuthContext";

export class SignupModel {
  async signup(user: SignupModelProps) {
    const auth = useAuth();

    if (user.email == null || user.password == null) {
      return;
    }

    await auth.signup({
      email: user.email,
      password: user.password,
    });
  }
}
