import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from "./ProtectedRoute";
import { auth } from "../utils/auth";

function App() {
  {/*стейты для попапов*/ }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isAuthComplete, setisAuthComplete] = useState(false); //стейт авторизации
  const [currentUser, setCurrentUser] = useState({}); //стейт текущего пользователя
  const [cards, setCards] = useState([]); //стейт карточек
  const [loggedIn, setLoggedIn] = useState(false) //стейт авторизации пользователя
  const [email, setEmail] = useState('')//стэйт почты пользователя
  const [formValue, setFormValue] = useState({ //стэйт формы авторизации и регистрации
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const navigate = useNavigate();

  function displayError(err) { //показ ошибки от сервера
    alert(err)
  };

  //функции бработчики - изменяют переменную состояния открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setisInfoTooltipPopupOpen(false)
  }

  function handleCardImageClick(card) { // открытие попапа с изображением
    setSelectedCard(card);
  }

  function handleCardLike(card) { // лайк/дизлайк карточки
    const isUserLiked = card.likes.some((userLiked) => { //лайкал ли пользователь карточку
      return userLiked._id === currentUser._id
    })
    api.likeCard(card._id, isUserLiked) //запрос на постановку/снятие лайка
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => displayError(err));
  }

  function handleCardDelete(id) { //удаление карточки
    api.deleteCard(id) //запрос на удаление карточки
      .then(() => {
        setCards((state) => state.filter((c) => c._id != id))
      })
      .catch(err => displayError(err));
  }

  function handleUpdateUser(userObject) { //обновление информации о пользователе
    api.editUserInfo(userObject)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch(err => displayError(err));

  }

  function handleUpdateAvatar(userObject) { //обновление аватара
    api.changeAvatar(userObject)
      .then((res) => {
        setCurrentUser(res);
        handleCloseAllPopups();
      })
      .catch(err => displayError(err));
  }

  function handleAddCard(data) { //добавление карточки
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch(err => displayError(err));
  }

  function handleLogin(isLogin) { //вход/выход на сайт
    setLoggedIn(isLogin);
  }

  function checkToken() { //проверка токена
    if (localStorage.getItem('token')) { //если в памяти браузера есть токен
      const token = localStorage.getItem('token');
      auth.checkToken(token) //запрос к API на регистрацию
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.data.email);
          navigate('/react-mesto-auth', { replace: true });

        })
        .catch(err => displayError(err));
    }
  }

  useEffect(() => { //при загрузке страницы 

    api.getDataServer('cards') //получили данные карточек и пользователя
      .then((res) => {
        setCards(res) //сохранили в стейт cards
      })
      .catch(err => displayError(err));

    api.getDataServer('users/me')
      .then((res) => {
        setCurrentUser(res); //сохранили в стэйт currentUser
      })
      .catch(err => displayError(err));

    checkToken();//проверили токен пользователя
  }, [])


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={loggedIn} user={currentUser} userEmail={email} onLogout={handleLogin} />
        <Routes>
          <Route //роут для зарегистрированных пользователей с основным содержимым
            path="/react-mesto-auth"
            element={
              <ProtectedRouteElement element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardImageClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />

          <Route //роут для регистрации
            path="/sign-up"
            element={
              <Register
                onChange={handleChange}
                formValue={formValue}
                userEmail={email}
                setEmail={setEmail}
                setisInfoTooltipPopupOpen={setisInfoTooltipPopupOpen}
                setisAuthComplete={setisAuthComplete}
                setFormValue={setFormValue}
              />}
          />

          <Route //роут для авторизации
            path="/sign-in"
            element={
              <Login
                onChange={handleChange}
                formValue={formValue}
                onLogin={handleLogin}
                userEmail={email}
                setEmail={setEmail}
                setisInfoTooltipPopupOpen={setisInfoTooltipPopupOpen}
                setisAuthComplete={setisAuthComplete}
                setFormValue={setFormValue}
              />}
          />
        </Routes>
        {/*Попап: Форма редактирования профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/*Попап: Форма добавления карточки*/}
        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          handleCloseAllPopups={handleCloseAllPopups}
          onAddCard={handleAddCard}>
        </AddPlacePopup>

        {/*Попап удаления карточки*/}
        <PopupWithForm
          title='Вы уверены?'
          name='delete-popup'
          textSubmitButton='Да'
          isOpen={false}
          onClose={handleCloseAllPopups}>
        </PopupWithForm>

        {/*Попап редактирования аватара*/}
        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={handleCloseAllPopups}>
        </EditAvatarPopup>

        {/*Попап просмотра изображения карточки*/}
        <ImagePopup
          card={selectedCard}
          onClose={handleCloseAllPopups}
        />

        {/*Попап успешной/неуспешной авторизации */}
        <InfoTooltip
          isAuthComplete={isAuthComplete}
          isOpen={isInfoTooltipPopupOpen}
          onClose={handleCloseAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
