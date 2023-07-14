import { FC, useState } from 'react';
import './FormSignIn.scss';
import { Input } from '../Input/Input';
import { Link } from 'react-router-dom';

interface IFormSignIn {
}

export const FormSignIn: FC<IFormSignIn> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [passwordNew, setNewPassword] = useState('');
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
    // const handleChangePasswordNew = (newPassword: string) => {
    //     setNewPassword(newPassword);
    // }
    const handleChangePasswordConfirm = (newPassword: string) => {
        setPasswordConfirm(newPassword);
    }

    return (
        <form className='formSignIn'>
            <div className='inputWraps'>
                <h2 className='h2-SignIn'>Sign Up</h2>
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
                    type={"password"}
                />
                <Input
                    title='Confirm Password'
                    placeholder='Confirm Password'
                    value={passwordConfirm}
                    handleChange={handleChangePasswordConfirm}
                    isDisabled={false}
                    type='password'
                />
                <div className='formBtn-Wraps'>
                    <button>Sign in</button>
                </div>
                <div className='bottomText'>
                <p>Don’t have an account? </p> <Link className='link-colors' to='/home'> Sign Up</Link>
                </div>
            </div>

            {/* <div className='inputWrap'>
                <div className='inputWrap__input'>
                    <Input
                        title='New Password'
                        placeholder='New Password'
                        value={passwordNew}
                        handleChange={handleChangePasswordNew}
                        isDisabled={false}
                    />
                </div>

            </div> */}

        </form>
    )
};
