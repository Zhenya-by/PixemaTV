import { FC, useState } from 'react';
import './FormSignUp.scss';
import { Input } from '../SignUp/Input/Input';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../Store/userSlice';
import { useAppDispatch } from '../../../hooks/redux-hooks';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Initialize auth instance

interface IFormSignUp {}

export const FormSignUp: FC<IFormSignUp> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State variable for registration success

  const handleChangeName = (newName: string) => {
    setName(newName);
  };

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleChangePasswordConfirm = (newPassword: string) => {
    setPasswordConfirm(newPassword);
  };

  const dispatch = useAppDispatch();

  const handleRegister = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            name, // Сохранение имени пользователя
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setRegistrationSuccess(true);
      })
      .catch(console.error);
  };

  return (
    <form
      className='formSignIn'
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister(name, email, password, passwordConfirm);
      }}
    >
      <div className='inputWraps'>
        <h2 className='h2-SignIn'>Sign Up</h2>
        {registrationSuccess && <p className="registration-success">Registration successful!</p>} {/* Render registration success message */}
        <Input
          title='Name'
          placeholder='Your Name'
          value={name}
          handleChange={handleChangeName}
          isDisabled={false}
          type='text'
        />
        <Input
          title='Email'
          placeholder='Your Email'
          value={email}
          handleChange={handleChangeEmail}
          isDisabled={false}
        />
        <Input
          title='Password'
          placeholder='Your Password'
          value={password}
          handleChange={handleChangePassword}
          isDisabled={false}
          type='password'
        />
        <Link className='forgot-password' to='/reset-password'>
          Forgot password?
        </Link>
        <Input
          title='Confirm Password'
          placeholder='Confirm Password'
          value={passwordConfirm}
          handleChange={handleChangePasswordConfirm}
          isDisabled={false}
          type='password'
        />
        <div className='formBtn-Wraps'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='bottomText'>
          <p>Don’t have an account?</p>{' '}
          <Link className='link-colors' to='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
