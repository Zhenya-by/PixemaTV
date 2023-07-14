import { FC, useState } from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/Logo/Logo';
import { FormSignIn } from '../FormSignIn/FormSignIn';
import { Input } from '../Input/Input';

interface ISignIn {
}

export const SignIn: FC<ISignIn> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordNew, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChangeName = (newName: string) => {
        setName(newName);
    }
    const handleChangeEmail = (newEmail: string) => {
        setEmail(newEmail);
    }
    const handleChangePassword = (newPassword: string) => {
        setPassword(newPassword);
    }
    const handleChangePasswordNew = (newPassword: string) => {
        setNewPassword(newPassword);
    }
    const handleChangePasswordConfirm = (newPassword: string) => {
        setPasswordConfirm(newPassword);
    }
    return (
        <div className='signIn-wrap'>
            <Link to='/home'>
                <div className='logoImg'><Logo/></div>
            </Link>
            <FormSignIn>

            </FormSignIn>
        </div>
    )
};
