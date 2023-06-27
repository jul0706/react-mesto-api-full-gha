function AuthForm({ type, onSubmit, formValue, onChange }) {

    return (
        <>
            <h2 className="login__title">{type === 'Вход' ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={onSubmit} className="login__form">
                <input
                    type="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    className="login__input"
                    minLength="8"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={onChange}
                />
                <button className="login__button">{type === 'Вход' ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
        </>
    )
}

export default AuthForm;