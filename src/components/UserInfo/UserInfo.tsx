import { FC } from 'react';
import './UserInfo.scss';
import { IUserInfo } from '../../interfaces/Interfaces';
import { Link } from 'react-router-dom';

export const UserInfo: FC<IUserInfo> = ({ username }) => {

    const generateInitials = (username: string) => {
        return username.split(' ').map((n) => n[0]).join('').toUpperCase();
    }

    return (
        <Link to={'/sign-in'}>
            <div className='userinfo'>
                <div className='userinfo__initials'>{generateInitials(username)}</div>
                <div className='userinfo__name'>{username}</div>
            </div>
        </Link>
    )
}
