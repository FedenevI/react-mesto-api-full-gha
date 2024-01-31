export default function ImagePopup ({card, isOpen, isClose}) {
    return(
      <div className={`popup popup-image ${isOpen ? 'popup_opened' : ''}`} onClick={isClose}>
        <div className="popup-image__wrapper" onClick={(evt => evt.stopPropagation())}>
          <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={isClose}
          />
          <img className="popup-image__container" 
          src={card.link ? card.link : '#'} 
          alt={card.name ? `Изображение ${card.name}` : '#'} />
          <p className="popup-image__name">{card.name}</p>
        </div>
      </div>

    )
}