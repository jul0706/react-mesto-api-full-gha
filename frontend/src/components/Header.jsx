import logoPath from '../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, userEmail, onLogout }) {

    const navigate = useNavigate();

    function logOut() { //выход из системы
        localStorage.removeItem('token'); //удалили токен
        onLogout(false) //обновили стэйт
        navigate('/sign-in', { replace: true }); //перенаправили на страницу входа
    }

    function redirectToRegistration() { //перенаправление на регистрацию
        navigate('/sign-up', { replace: false })
    }

    function redirectToLogin() { //перенаправление на регистрацию
        navigate('/sign-in', { replace: false })
    }

    return (
        <header className="header">
            <img src={logoPath} alt="логотип сайта" className="header__logo" />

            <div className='header__auth-container'>
                {isLoggedIn && <p className="header__login">{userEmail}</p>} {/*Если пользователь авторизован, показать почту*/}
                <button
                    type='button'
                    className='header__button'
                    onClick={
                        isLoggedIn ? logOut : (window.location.href.endsWith('sign-in') ? redirectToRegistration : redirectToLogin)
                    }>
                    {isLoggedIn ? 'Выйти' : (window.location.href.endsWith('sign-in') ? 'Регистрация' : 'Войти')}
                </button>
            </div>
        </header>
    )
}

export default Header;