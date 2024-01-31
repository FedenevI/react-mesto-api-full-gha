export default function PopupWithForm({name, title, titleBtn, children, isOpen, isClose, onSubmit, isSend, isValid=true}) {
    return(
    <div className= {`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={isClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <h2 className={`popup__title ${name === 'popup-delete' ? 'popup__title_delete' : ''}`}>{title}</h2>
        <form
        action="name"
        name={name}
        id="edit-profile"
        className="popup__form popup-profile__form"
        noValidate=""
        onSubmit={onSubmit}
        >
        {children}
        <button
          type="submit"
          className={`popup__button popup__save-button  ${name === 'popup-delete' ? 'popup__delete-button' : ''} ${isValid ? '' : 'popup__button_disabled'}`}
          aria-label="сохранить"
          disabled={isSend}
        >  
          {isSend ? 'Ожидайте' : titleBtn||'Сохранить'}
        </button>
        </form>

        <button
          className="popup__close-button popup__close-profile"
          type="button"
          aria-label="закрыть"
          onClick={isClose}
        />
      </div>
    </div>
    )
}