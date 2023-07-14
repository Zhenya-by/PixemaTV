import { FC, useState } from 'react';
import './FormSettings.scss';
import { Input } from '../Input/Input';

interface IFormSettings {
}

export const FormSettings: FC<IFormSettings> = () => {
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
        <form>
            <h2>Profile</h2>
            <div className='inputWrap'>
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
            </div>
            <h2>Password</h2>
            <div className='inputWrap'>
                <Input
                    title='Password'
                    placeholder='Your Password'
                    value={password}
                    handleChange={handleChangePassword}
                    isDisabled={false}
                    type={"password"}
                />
                <div className='inputWrap__input'>
                    <Input
                        title='New Password'
                        placeholder='New Password'
                        value={passwordNew}
                        handleChange={handleChangePasswordNew}
                        isDisabled={false}
                    />
                    <Input
                        title='Confirm Password'
                        placeholder='Confirm Password'
                        value={passwordConfirm}
                        handleChange={handleChangePasswordConfirm}
                        isDisabled={false}
                    />
                </div>
            </div>
            <div className='formBtn-Wrap'>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </form>
    )
};
