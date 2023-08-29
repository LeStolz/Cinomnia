import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { api } from "../utils/api";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
  appId: import.meta.env.VITE_FIREBASE_APP_ID!,
});

type AuthContext = {
  signin: (user: User, remember: boolean) => void;
  signinWithGoogle: () => void;
  signout: () => void;
  getUser: () => any;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

type AuthProviderProps = {
  children: ReactNode;
};

export type User = {
  email: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  auth.languageCode = "it";
  auth.useDeviceLanguage();

  useEffect(() => {
    (async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          await signInWithEmailLink(auth, email!, window.location.href);
          await api.post("/users/signin", { email });
          navigate("/");
        } catch (err) {
          console.error(err);
        }

        window.localStorage.removeItem("emailForSignIn");
      }
    })();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signin = async (user: User, remember: boolean) => {
    setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    await sendSignInLinkToEmail(auth, user.email, {
      url: import.meta.env.VITE_CLIENT_URL,
      handleCodeInApp: true,
    });

    window.localStorage.setItem("emailForSignIn", user.email);
  };

  const signinWithGoogle = async () => {
    setPersistence(auth, browserLocalPersistence);

    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    await api.post("/users/signin", { email: res.user.email });
    navigate("/");
  };

  const signout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const getUser = async () => {
    if (user && user.email) {
      try {
        const newUser = await api.get(`/users/${user.email}`);
        setUser(newUser.data);
        return newUser.data;
      } catch {
        return undefined;
      }
    }

    return null;
  };

  const value = {
    signin,
    signinWithGoogle,
    signout,
    getUser,
  };

  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
}
