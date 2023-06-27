import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isAddPlacePopupOpen, handleCloseAllPopups, onAddCard}) {

    const nameInputRef = useRef();
    const linkInputRef = useRef();

    useEffect(()=>{ //очистка полей ввода при открытии/закрытии попапа
        if (!isAddPlacePopupOpen) { //если попап закрывается
            nameInputRef.current.value=''; //очистить
            linkInputRef.current.value='';
        }
    },[isAddPlacePopupOpen])

    function handleSubmit (e) { //отправка формы
        e.preventDefault();
        onAddCard({ //обновили информацию о пользователе
            name:nameInputRef.current.value,
            link:linkInputRef.current.value
        })
    }
    return (
        <PopupWithForm 
            title='Новое место' 
            name='add-button-popup'
            textSubmitButton='Создать'
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onSubmit={handleSubmit}>
                <fieldset className="form-popup__inputs">
                    <input 
                        ref={nameInputRef}
                        type="text" 
                        id='place-input' 
                        name="name" 
                        className="form-popup__input form-popup__input_type_place" 
                        minLength="2" 
                        maxLength="30" 
                        placeholder="Название" 
                        required 
                    />
                    <span className="place-input-error form-popup__error"></span>
                    <input 
                        ref={linkInputRef}
                        type="url" 
                        id="link-input" 
                        name="link" 
                        className="form-popup__input form-popup__input_type_link" 
                        placeholder="Ссылка на картинку" 
                        required 
                    />
                    <span className="link-input-error form-popup__error"></span>
                </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;