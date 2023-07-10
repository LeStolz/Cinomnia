import { LoginModelProps } from "./Login";
import { useAuth } from "../../contexts/AuthContext";

export class LoginModel {
  async login(user: LoginModelProps) {
    const auth = useAuth();

    if (user.email == null) {
      return;
    }

    await auth.signup({
      email: user.email
    });
  }
}