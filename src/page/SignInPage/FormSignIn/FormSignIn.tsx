import { FC, useState, useEffect } from "react";
import "./FormSignIn.scss";
import { Input } from "../SignIn/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState<string | null>(null); // Состояние для сообщения об ошибке

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        navigate("/home"); // Перенаправить на страницу "/home", если пользователь уже аутентифицирован
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogin = (name: string, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            username: name,
          })
        );

        // Установите имя пользователя с помощью updateProfile
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            console.log("Username set:", name);
            setEmail("");
            setPassword("");
            setError(null);

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);

            navigate("/home", { state: { message: "Sign in success" } });
          })
          .catch((error) => {
            console.error("Error setting username:", error);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleChangeUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  if (isAuth) {
    navigate("/home"); // Перенаправить на страницу "/home", если пользователь уже аутентифицирован
    return null; // Вернуть пустой компонент, так как перенаправление уже произошло
  }

  return (
    <form
      className="formSignIn"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, email, password);
      }}
    >
      <div className="inputWraps">
        <h2 className="h2-SignIn">Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <Input
          title="Username" // Добавлено поле для ввода имени пользователя
          placeholder="Your Username"
          value={username}
          handleChange={handleChangeUsername}
          isDisabled={false}
        />
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
          <p>Don’t have an account? </p>
          <Link className="link-colors" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
