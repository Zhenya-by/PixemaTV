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
import { Controller, useForm } from "react-hook-form";

interface IFormSignIn { }

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
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAuth, setIsAuth] = useState(false); // Initialize isAuth state

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

  const { 
    handleSubmit,
    control, 
    formState: { errors }, 
    setValue 
  } = useForm<{
    name: string;
    email: string;
    password: string;
  }>();

  const handleLogin = async (data: { name: string; email: string; password: string }) => {
    const { name, email, password } = data;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          username: name,
        })
      );

      // Установите имя пользователя с помощью updateProfile
      await updateProfile(user, {
        displayName: name,
      });

      console.log("Username set:", name);
      setValue("name", "");
      setValue("email", "");
      setValue("password", "");
      setLoginSuccess(true);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      navigate("/home", { state: { message: "Sign in success" } });
    } catch (error) {
      if (typeof error === "string") {
        console.error("Error registering user: " + error);
      } else {
        console.error("Error registering user");
      }
    }
  };

  if (isAuth) {
    navigate("/home"); // Перенаправить на страницу "/home", если пользователь уже аутентифицирован
    return null; // Вернуть пустой компонент, так как перенаправление уже произошло
  }

  const onSubmit = handleSubmit(handleLogin);

  return (
    <form className="formSignIn" onSubmit={onSubmit}>
      <div className="inputWraps">
        <h2 className="h2-SignIn">Sign In</h2>
        {loginSuccess && (
          <p className="registration-success">Registration successful!</p>
        )}
        {errors.name && <p className="error-message">Username is required and must be at least 3 characters long.</p>}
        {errors.email && <p className="error-message">Email is required.</p>}
        {errors.password && <p className="error-message">Password is required.</p>}
        
        <div>
          <label htmlFor="name">Name:</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => <input className="custom-input" {...field} type="text" />}
          />
          {errors.name && <span>Name должен быть минимум 3 символа.</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => <input className="custom-input" {...field} type="email" />}
          />
          {errors.email && <span>Email обязателен к заполнению.</span>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => <input className="custom-input" {...field} type="password" />}
          />
          {errors.password && <span>Password обязателен к заполнению.</span>}
        </div>
        {/* <Link className="forgot-password" to="/reset-password">
          Forgot password?
        </Link> */}
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
