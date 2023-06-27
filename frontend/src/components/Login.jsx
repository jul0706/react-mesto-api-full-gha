import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from "../utils/auth";
import AuthForm from "./AuthForm";


function Login({ onLogin, userEmail, setEmail, setisInfoTooltipPopupOpen, setisAuthComplete, onChange, formValue, setFormValue }) {

    const [password, setPassword] = useState('') //стэйт пароля

    const navigate = useNavigate();

    const handleLogin = (e) => { //отправка формы авторизации
        e.preventDefault();
        if (!formValue.email || !formValue.password) { //если одно из полей не заполнено
            return;
        }
        auth.login(formValue) //запрос к API на вход
            .then((data) => {
                localStorage.setItem('token', data.token); //сохранили токен
                onLogin(true);
                setEmail(formValue.email);
                setPassword(formValue.password);
                setFormValue({ email: '', password: '' });
                navigate('/react-mesto-auth', { replace: true });
            })
            .catch(() => {
                setisAuthComplete(false); // авторизация не успешна
                setisInfoTooltipPopupOpen(true); //открыть попап
            })
    }

    return (
        <div className="login">
            <AuthForm type={'Вход'} onSubmit={handleLogin} onChange={onChange} formValue={formValue} />
        </div>
    )
}

export default Login;