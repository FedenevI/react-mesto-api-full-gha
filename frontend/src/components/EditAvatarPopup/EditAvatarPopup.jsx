import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({isOpen, isClose, onUpdateAvatar, isSend}){
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        isClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({editAvatar: input.current.value}, reset)
    }

    return(
        <PopupWithForm
            name='popup-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            isSend={isSend}
            isValid={isValid}
            isClose={resetForClose}
            onSubmit={handleSubmit}
        >
          <label className="popup__input-box">
            <input
                ref={input}
                id="editAvatar"
                type="url"
                name="editAvatar"
                required
                className={`popup__input popup__input-image ${isInputValid.editAvatar === undefined || isInputValid.editAvatar ? '' : 'popup__input_type_error'}`}
                placeholder="Ссылка на картинку"
                value={values.editAvatar ? values.editAvatar : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className={`popup__input-error editAvatar-error ${isInputValid.editAvatar === undefined || isInputValid.editAvatar ? '' : 'popup__error_visible'}`}>{errors.editAvatar}</span>
          </label>
        </PopupWithForm>
    )
}