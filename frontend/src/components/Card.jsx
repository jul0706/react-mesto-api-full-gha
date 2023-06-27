import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useContext } from 'react';

function Card ({cardData, onCardClick, onCardLike, onCardDelete}) {
    
    const user = useContext(CurrentUserContext); //подписались на контекст текущего пользователя 

    const isUserOwner = cardData.owner._id === user._id; //является ли пользователь владельцем карточки
    const isUserLiked = cardData.likes.some((userLiked)=>{ //лайкал ли пользователь карточку
        return userLiked._id === user._id
    })

    function handleImageClick () { //обработчик открытия попапа с изображением
        onCardClick(cardData)
    }

    function handleLikeClick () { //обработчик лайка/дизлайка карточки
        onCardLike(cardData)
    }

    function handleCardDelete () { // обработчик удаления карточки
        onCardDelete(cardData._id)
    }
    
    return (
        <article className="place">
            {isUserOwner && <button onClick={handleCardDelete} className="place__delete-icon"></button>}
            <img 
                src={`${cardData ? cardData.link : ''}`} 
                className="place__image" 
                onClick={handleImageClick}
                alt={cardData.name}
            /> {/*Изобажение*/}
            <div className="place__caption"> {/*Контейнер для нижней белой части*/}
                <h2 className="place__title">
                    {cardData.name}
                </h2>
                <div className="place__like-area">
                    <button 
                        type="button" 
                        className={`place__like-button ${isUserLiked && 'place__like-button_active'}`} //если пользоваетль лайкал карточку, добавить класс
                        aria-label="кнопка понравилось"
                        onClick={handleLikeClick}>
                    </button>
                    {cardData.likes.length !== 0 && <p className='place__like-amount'>{cardData.likes.length}</p>} {/*если у карточки есть лайки, показать их количество */}
                </div>
            </div>
        </article>
    )
}

export default Card;