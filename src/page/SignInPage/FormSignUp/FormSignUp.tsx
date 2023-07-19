import { FC, useState } from "react";
import "./FormSignUp.scss";
import { Input } from "../SignUp/Input/Input";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useForm, Controller } from 'react-hook-form';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setUser } from "../../../Store/userSlice";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { SubmitHandler } from 'react-hook-form';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Initialize auth instance

interface IFormSignUp { }

export const FormSignUp: FC<IFormSignUp> = () => {
  // const username = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State variable for registration success

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue
  } = useForm<{ name: string; email: string; password: string; passwordConfirm: string }>();

  const watchPassword = watch('password');

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          username: name,
        })
      );

      // Set username using updateProfile
      await updateProfile(user, {
        displayName: name,
      });

      console.log("Username set:", name);
      setValue("name", "");
      setValue("email", "");
      setValue("password", "");
      setValue("passwordConfirm", "");
      setRegistrationSuccess(true);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const onSubmit: SubmitHandler<{ name: string; email: string; password: string; passwordConfirm: string }> = (data) => {
    const { name, email, password, passwordConfirm } = data; // Destructure form data

    if (password === passwordConfirm) {
      // Passwords match, handle registration
      handleRegister(name, email, password, passwordConfirm);

      // Reset the password matching error
      setPasswordMatchError(false);
    } else {
      // Passwords don't match, set the password matching error
      setPasswordMatchError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formSignIn">
      <div className="inputWraps">
        <h2 className="h2-SignIn">Sign Up</h2>
        {registrationSuccess && (
          <p className="registration-success">Регистрация прошла успешно!</p>
        )}

        <div>
          <label htmlFor="name">Name:</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => <input className="custom-input" placeholder="Your name" {...field} type="text" />}
          />
          {errors.name && <p>Name должен быть минимум 3 символа.</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => <input className="custom-input" placeholder="Your email" {...field} type="email" />}
          />
           {errors.email ? <p>Email обязателен к заполнению.</p> : <p></p>}
        </div>

        <div>
  <label htmlFor="password">Password:</label>
  <Controller
    name="password"
    control={control}
    defaultValue=""
    rules={{ required: true, minLength: 6 }} // Adding the minLength validation rule
    render={({ field }) => <input className="custom-input" placeholder="Your password" {...field} type="password" />}
  />
  {errors.password && <p>Пароль должен совпадать.</p>}
  {errors.password?.type === "minLength" && <p>Пароль не менее 6 символов.</p>}
</div>

<div>
  <label htmlFor="passwordConfirm">Password Confirm:</label>
  <Controller
    name="passwordConfirm"
    control={control}
    defaultValue=""
    rules={{ required: true, minLength: 6 }} // Adding the minLength validation rule
    render={({ field }) => <input className="custom-input" placeholder="Your password" {...field} type="password" />}
  />
  {errors.passwordConfirm && <p>Пароль должен совпадать.</p>}
  {errors.passwordConfirm?.type === "minLength" && <p>Пароль не менее 6 символов.</p>}
  {passwordMatchError && <p className="error-message">Пароли не совпали</p>}
</div>

        <button className="btn-signUp" type="submit" disabled={!watchPassword || watchPassword !== watch('password')}>
          Sign Up
        </button>

        <div className="bottomText">
          <p>Don’t have an account?</p>{" "}
          <Link className="link-colors" to="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
