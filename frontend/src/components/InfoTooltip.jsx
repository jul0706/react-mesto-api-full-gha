import checkPath from '../images/check.svg';
import errorPath from '../images/error.svg';

function InfoTooltip({ isAuthComplete, isOpen, onClose }) {

    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}> {/*Попап на всю страницу*/}
            <div className='popup-container'> {/*Окно оповещения*/}
                <button className='close-icon' onClick={onClose}></button> {/*Кнопка закрытия*/}
                <div className="info-popup">
                    <img className="info-popup__image" src={isAuthComplete ? checkPath : errorPath} alt='галочка' />
                    <p className="info-popup__caption">{isAuthComplete ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;