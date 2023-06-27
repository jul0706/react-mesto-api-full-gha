function ImagePopup ({card, onClose}) {
    return (
        <div className={`popup place-popup ${card && 'popup_is-opened'}`}> {/*Попап на всю страницу*/}
            <div className="img-popup-container"> {/*Окно изображения*/}
                <button className="close-icon img-popup-container__close-icon" onClick={onClose}></button> {/*Кнопка закрытия*/}
                <figure className="image-figure">
                    <img className="image-figure__image" src={`${card ? card.link : ''}`} alt={`${card ? card.name  : ''}`}/>
                    <figcaption className="image-figure__caption">{`${card ? card.name : ''}`}</figcaption>
                </figure>
            </div>
        </div> 
    )
}

export default ImagePopup;