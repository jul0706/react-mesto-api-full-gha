import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main ({onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                onCardLike,
                onCardDelete,
                cards
            }) {
    const user = useContext(CurrentUserContext); //подписались на контекст текущего пользователя       

    return (
        <main className="main"> 
            {/*Блок profile*/}
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img src={`${user.avatar}`} alt="аватар пользователя" className="profile__avatar" />  {/*Аватар */}
                </button>
                {/*Контейнер для заголовка, подзаголовка  на 1024*/}
                <div className="profile__title-and-subtitle-form"> 
                    <div className="profile__title-form"> {/*Контейнер для заголовка с кнопкой*/}
                        <h1 className="profile__title">{user.name}</h1>
                        <button type="button" className="profile__edit-button" aria-label="кнопка редактирования" onClick={onEditProfile}></button> {/*Кнопка "редактировать*/}
                    </div> 
                    <p className="profile__subtitle">{user.about}</p>
                </div> 
                <button type="button" className="add-button" aria-label="кнопка добавления карточки" onClick={onAddPlace}></button>{/*Кнопка "добавить"*/}
            </section>
                {/*Блок Places*/}
            <section className="places">
                {/*Заготовка для карточки*/}
                {cards.map((card) => ( // каждую карточку из массива добавляем на страницу
                    <Card 
                        key = {card._id}
                        cardData = {card} 
                        onCardClick = {onCardClick}
                        onCardLike = {onCardLike}
                        onCardDelete = {onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;