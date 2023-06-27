import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isEditAvatarPopupOpen, onClose, onUpdateAvatar }) {

    const inputRef = useRef();

    useEffect(() => { //очистка полей ввода при открытии/закрытии попапа
        if (!isEditAvatarPopupOpen) { //если попап закрывается
            inputRef.current.value = ''; //очистить
        }
    }, [isEditAvatarPopupOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ //обновили информацию о пользователе
            avatar: inputRef.current.value
        })
    }
    return (
        <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar-popup'
            textSubmitButton='Сохранить'
            isOpen={isEditAvatarPopupOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form-popup__inputs">
                <input
                    ref={inputRef}
                    type="url"
                    id='avatar-input'
                    name="avatar"
                    className="form-popup__input form-popup__input_type_avatar"
                    placeholder="Ссылка на изображение"
                    required
                />
                <span className="avatar-input-error form-popup__error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;