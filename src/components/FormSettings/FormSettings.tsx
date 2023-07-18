import { FC, useEffect, useState } from 'react';
import './FormSettings.scss';
import { Input } from '../Input/Input';
import { useAppContext } from '../../Contexts/AppContex';
import LogoutButton from 'components/LogoutButton/LogoutButton';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useSelector } from 'react-redux';
interface IFormSettings { }

export const FormSettings: FC<IFormSettings> = () => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleChangeUsername = (newUsername: string) => {
        setUsername(newUsername);
    };

    const handleChangeUserEmail = (newUserEmail: string) => {
        setUserEmail(newUserEmail);
    };

    const { toggleTheme, isDarkTheme } = useAppContext();
    const handleToggleTheme = () => {
        toggleTheme();
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
          if (user) {
            // Если пользователь аутентифицирован, получите его данные
            const userData = {
              username: user.displayName || '',
              email: user.email || '',
            };
      
            // Выводим данные пользователя в консоль
            console.log('User Data:', userData);
      
            // Установите данные пользователя в соответствующие состояния
            setUsername(userData.username);
            setUserEmail(userData.email);
          }
        });
      
        return () => unsubscribe();
      }, []);

    return (
        <div className={isDarkTheme() ? 'dark' : 'light'}>
            <h2 className='theme-h2'>Color mode</h2>
            <div className='inputWrap'>
                <button onClick={handleToggleTheme}>Theme</button>
            </div>
            <form>
                <h2>Profile</h2>
                <div className='inputWrap'>

                    <Input
                        title='Username'
                        placeholder='Your Username'
                        value={username}
                        handleChange={handleChangeUsername}
                        isDisabled={false}
                        type='text'
                    />
                    <Input
                        title='User Email'
                        placeholder='Your User Email'
                        value={userEmail}
                        handleChange={handleChangeUserEmail}
                        isDisabled={false}
                    />
                </div>
                <h2>Password</h2>
                <div className='inputWrap'>
                    <Input
                        title='Password'
                        placeholder='Your Password'
                        value=''
                        handleChange={() => { }}
                        isDisabled={false}
                        type='password'
                    />
                    <div className='inputWrap__input'>
                        <Input
                            title='New Password'
                            placeholder='New Password'
                            value=''
                            handleChange={() => { }}
                            isDisabled={false}
                        />
                        <Input
                            title='Confirm Password'
                            placeholder='Confirm Password'
                            value=''
                            handleChange={() => { }}
                            isDisabled={false}
                        />
                    </div>
                </div>

                <div className='formBtn-Wrap'>
                    <LogoutButton />
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
};
