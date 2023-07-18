import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../Store/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth(); // Получаем экземпляр auth
  const { isAuth } = useAuth(); // Получаем статус авторизации из хука useAuth

  const handleLogout = () => {
    // Выход из аккаунта в Firebase
    signOut(auth)
      .then(() => {
        // Удаляем данные пользователя из Redux-хранилища
        dispatch(removeUser());
        // Дополнительная логика для очистки других необходимых данных или выполнения дополнительных действий
      })
      .catch(console.error);
  };

  return (
    <>
      {isAuth ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/sign-in">
        <button>Sign In</button>
      </Link>
      )}
    </>
  );
};

export default LogoutButton;
