import { FC, useState } from 'react';
import './FormSettings.scss';
import { Input } from '../Input/Input';
import { useAppContext } from '../../Contexts/AppContex';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { removeUser, setUser } from 'Store/userSlice';
import { useNavigate } from 'react-router-dom';

interface IFormSettings {}

export const FormSettings: FC<IFormSettings> = () => {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNew, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const handleChangeName = (newName: string) => {
    setName(newName);
  };
  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };
  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };
  const handleChangePasswordNew = (newPassword: string) => {
    setNewPassword(newPassword);
  };
  const handleChangePasswordConfirm = (newPassword: string) => {
    setPasswordConfirm(newPassword);
  };

  const { toggleTheme, isDarkTheme } = useAppContext();
  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    navigate('/sign-up');
    dispatch(removeUser());
    // Реализуйте логику выхода пользователя
  };

  return (
    <div className={isDarkTheme() ? 'dark' : 'light'}>
      <h2 className="theme-h2">Color mode</h2>
      <div className="inputWrap">
        <button onClick={handleToggleTheme}>Theme</button>
      </div>
      <form>
        <h2>Profile</h2>
        <div className="inputWrap">
        <Input
            title="Name"
            placeholder="Your Name"
            value={user.name || ''} // Использование имени пользователя из Redux store
            handleChange={handleChangeName}
            isDisabled={false}
            type="text"
          />
          <Input
            title="Email"
            placeholder="Your Email"
            value={user.email || ''} // Использование email пользователя из Redux store
            handleChange={handleChangeEmail}
            isDisabled={false}
          />
        </div>
        <h2>Password</h2>
        <div className="inputWrap">
          <Input
            title="Password"
            placeholder="Your Password"
            value={password}
            handleChange={handleChangePassword}
            isDisabled={false}
            type="password"
          />
          <div className="inputWrap__input">
            <Input
              title="New Password"
              placeholder="New Password"
              value={passwordNew}
              handleChange={handleChangePasswordNew}
              isDisabled={false}
            />
            <Input
              title="Confirm Password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              handleChange={handleChangePasswordConfirm}
              isDisabled={false}
            />
          </div>
        </div>

        <div className="formBtn-Wrap">
          {user.email ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleLogout}>Login</button>
          )}
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};
