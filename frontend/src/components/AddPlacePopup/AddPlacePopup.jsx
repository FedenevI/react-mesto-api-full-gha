import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({isOpen, isClose, onAddPlace, isSend}){

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        isClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({placeName: values.placeName,  placeSrc: values.placeSrc}, reset)
    }

    return (
        <PopupWithForm 
            name='popup-card'
            title='Новое место'
            titleBtn='Создать'
            isOpen={isOpen}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}
            isClose={resetForClose}
            >
            <label className="popup__input-box">
            <input
                id="place-name"
                minLength={2}
                maxLength={30}
                required
                type="text"
                name="placeName"
                className={`popup__input popup__input-title ${isInputValid.placeName === undefined || isInputValid.placeName ? '' : 'popup__input_type_error'}`}
                placeholder="Название"
                value={values.placeName ? values.placeName : ''}
                disabled={isSend}
                onChange={handleChange}
          />
            <span className={`popup__input-error place-name-error ${isInputValid.placeName === undefined || isInputValid.placeName ? '' : 'popup__error_visible'}`}>{errors.placeName}</span>
            </label>
            <label className="popup__input-box">
            <input
                id="place-src"
                type="url"
                name="placeSrc"
                required
                className={`popup__input popup__input-image ${isInputValid.placeSrc === undefined || isInputValid.placeSrc ? '' : 'popup__input_type_error'}` }
                placeholder="Ссылка на картинку"
                value={values.placeSrc ? values.placeSrc : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className={`popup__input-error place-src-error ${isInputValid.placeSrc === undefined || isInputValid.placeSrc ? '' : 'popup__error_visible'}`}>{errors.placeSrc}</span>
            </label>
        </PopupWithForm>
    )
}