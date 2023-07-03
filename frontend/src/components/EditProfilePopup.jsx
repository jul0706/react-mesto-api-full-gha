import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const user = React.useContext(CurrentUserContext); //подписались на контекст текущего пользователя

    const [formValue, setFormValue] = useState({ //стэйт формы 
        name: "",
        about: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) { //обработчик отправки формы
        e.preventDefault();
        onUpdateUser({ //обновили информацию о пользователе
            name: formValue.name,
            about: formValue.about,
        })
    }

    React.useEffect(() => { //при открытии попапа подставить информацию о пользователе в поля формы
        if (user.name && user.about) {
            setFormValue({
                name: user.name,
                about: user.about
            });
        }
    }, [user, isOpen]);

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile-popup'
            textSubmitButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form-popup__inputs">
                <input
                    type="text"
                    id="name-input"
                    name="name"
                    className="form-popup__input form-popup__input_type_name"
                    minLength="2"
                    maxLength="40"
                    placeholder="Ваше имя"
                    onChange={handleChange}
                    value={formValue.name}
                    required
                />
                <span className="name-input-error form-popup__error"></span>
                <input
                    type="text"
                    id="job-input"
                    name="about"
                    className="form-popup__input form-popup__input_type_job"
                    minLength="2"
                    maxLength="200"
                    placeholder="Ваш род деятельности"
                    value={formValue.about}
                    onChange={handleChange}
                    required
                />
                <span className="job-input-error form-popup__error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;