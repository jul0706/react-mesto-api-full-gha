import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import AuthForm from "./AuthForm";
import { useState } from "react";


function Register({ userEmail, setEmail, setisInfoTooltipPopupOpen, setisAuthComplete, onChange, formValue, setFormValue }) {

    const [password, setPassword] = useState('') //стэйт пароля

    const navigate = useNavigate();

    const handleRegister = (e) => { //отправка формы регистрации
        e.preventDefault();
        auth.register(formValue)
            .then((data) => {
                setEmail(data.data.email);
                setPassword(formValue.password);
                setFormValue({ email: '', password: '' });
                navigate('/sign-in', { replace: true });
                setisAuthComplete(true); //авторизация успешна
                setisInfoTooltipPopupOpen(true); //открыть попап
            })
            .catch(() => { //при ошибке
                setisAuthComplete(false); //стейт авторизации - неуспешна
                setisInfoTooltipPopupOpen(true); //открыть попап
            })
    }

    return (
        <div className="login">
            <AuthForm type={'Регистрация'} onSubmit={handleRegister} onChange={onChange} formValue={formValue} />
            <p className="login__caption">Уже зарегистрированы? <Link className="login__entry-link" to="/sign-in">Войти</Link></p>
        </div>
    )
}

export default Register;