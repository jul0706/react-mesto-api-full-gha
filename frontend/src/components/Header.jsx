import logoPath from '../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';

function Header({ isLoggedIn, user, onLogout }) {

    const navigate = useNavigate();

    function logOut() { //выход из системы
        auth.logout();
        //localStorage.removeItem('login') //удалили токен
        onLogout(false) //обновили стэйт
        navigate('/signin', { replace: true }); //перенаправили на страницу входа
    }

    function redirectToRegistration() { //перенаправление на регистрацию
        navigate('/signup', { replace: false })
    }

    function redirectToLogin() { //перенаправление на регистрацию
        navigate('/signin', { replace: false })
    }

    return (
        <header className="header">
            <img src={logoPath} alt="логотип сайта" className="header__logo" />

            <div className='header__auth-container'>
                {isLoggedIn && <p className="header__login">{user.email}</p>} {/*Если пользователь авторизован, показать почту*/}
                <button
                    type='button'
                    className='header__button'
                    onClick={
                        isLoggedIn ? logOut : (window.location.href.endsWith('signin') ? redirectToRegistration : redirectToLogin)
                    }>
                    {isLoggedIn ? 'Выйти' : (window.location.href.endsWith('signin') ? 'Регистрация' : 'Войти')}
                </button>
            </div>
        </header>
    )
}

export default Header;