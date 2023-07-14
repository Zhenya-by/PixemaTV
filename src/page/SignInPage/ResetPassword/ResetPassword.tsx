import { FC, useState } from 'react';
import './ResetPassword.scss';
import { Link } from 'react-router-dom';
import { FormResetPassword } from '../FormResetPassword/FormResetPassword';
import { Logo } from '../../../components/Logo/Logo';

interface IResetPassword {
}

export const ResetPassword: FC<IResetPassword> = () => {
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [passwordNew, setNewPassword] = useState('');
    // const [passwordConfirm, setPasswordConfirm] = useState('');

    // const handleChangeName = (newName: string) => {
    //     setName(newName);
    // }
    const handleChangeEmail = (newEmail: string) => {
        setEmail(newEmail);
    }
    // const handleChangePassword = (newPassword: string) => {
    //     setPassword(newPassword);
    // }
    // const handleChangePasswordNew = (newPassword: string) => {
    //     setNewPassword(newPassword);
    // }
    // const handleChangePasswordConfirm = (newPassword: string) => {
    //     setPasswordConfirm(newPassword);
    // }
    return (
        <div className='signIn-wrap'>
            <Link to='/home'>
                <div className='logoImg'><Logo/></div>
            </Link>
            <FormResetPassword>

            </FormResetPassword>
        </div>
    )
};