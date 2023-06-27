
function PopupWithForm({ name, title, textSubmitButton, isOpen, onClose, onSubmit, children }) {

    return (
        <div className={`popup ${name} ${isOpen && 'popup_is-opened'}`}> {/*Попап на всю страницу*/}
            <div className={`popup-container ${name}-container`}> {/*Окно формы*/}
                <button className={`close-icon ${name}-container__close-icon`} onClick={onClose}></button> {/*Кнопка закрытия*/}
                <form name={`${name}`} className={`form-popup form-popup_type_${name}`} onSubmit={onSubmit}> {/*Форма*/}
                    <h2 className="form-popup__title">
                        {title}
                    </h2>
                    {children} {/*Разметка формы */}
                    <button type="submit" className="form-popup__button-save">{textSubmitButton}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;