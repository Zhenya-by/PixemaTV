import { FC, useState, useEffect } from "react";
import "./FormSignIn.scss";
import { Input } from "../SignIn/Input/Input";
import { Link, Navigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useAppDispatch } from "hooks/redux-hooks";
import { setUser } from "Store/userSlice";
import { initializeApp } from "firebase/app";

interface IFormSignIn {}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Инициализация экземпляра аутентификации

export const FormSignIn: FC<IFormSignIn> = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState<string | null>(null); // Состояние для сообщения об ошибке

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Если пользователь авторизован, устанавливаем isAuth в true
        setIsAuth(true);
      } else {
        // Если пользователь не авторизован, устанавливаем isAuth в false
        setIsAuth(false);
      }
    });

    // Отписываемся от подписки при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setEmail("");
        setPassword("");
        setError(null); // Сброс сообщения об ошибке при успешном входе
      })
      .catch((error) => {
        setError(error.message); // Установка сообщения об ошибке
      });
  };

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <form
      className="formSignIn"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(email, password);
      }}
    >
      <div className="inputWraps">
        <h2 className="h2-SignIn">Sign In</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Отображение сообщения об ошибке */}
        <Input
          title="Email"
          placeholder="Your Email"
          value={email}
          handleChange={handleChangeEmail}
          isDisabled={false}
        />
        <Input
          title="Password"
          placeholder="Your Password"
          value={password}
          handleChange={handleChangePassword}
          isDisabled={false}
          type="password"
        />
        <Link className="forgot-password" to="/reset-password">
          Forgot password?
        </Link>
        <div className="formBtn-Wraps">
          <button type="submit">Sign in</button>
        </div>
        <div className="bottomText">
          <p>Don’t have an account? </p>{" "}
          <Link className="link-colors" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
