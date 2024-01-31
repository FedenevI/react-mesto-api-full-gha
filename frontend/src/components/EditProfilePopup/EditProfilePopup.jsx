import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from '../../utils/useFormValidation'
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, isClose, onUpdateUser, isSend}){
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("title", currentUser.name)
        setValue("subtitle", currentUser.about)
    },[currentUser, setValue])

    function resetForClose() {
        isClose()
        reset({ title: currentUser.name, subtitle: currentUser.about })
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({title: values.title,  subtitle: values.subtitle}, reset)
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать Профиль'
            isOpen={isOpen}
            isClose={resetForClose}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}
            > 
            <label className="popup__input-box">
            <input
                id="profile-name"
                minLength={2}
                maxLength={40}
                type="text"
                required
                name="title"
                className={`popup__input popup__input_type_name ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
                placeholder="Имя"
                value={values.title ? values.title : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className={`popup__input-error profile-name-error ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__error_visible'}`}>{errors.title}</span>
            </label>
            <label className="popup__input-box">
            <input
                id="profile-job"
                minLength={2}
                maxLength={200}
                type="text"
                required
                name="subtitle"
                className={`popup__input popup__input_type_job ${isInputValid.subtitle === undefined || isInputValid.subtitle ? '' : 'popup__input_type_error'}`}
                placeholder="Профессия"
                value={values.subtitle ? values.subtitle : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className={`popup__input-error profile-job-error ${isInputValid.subtitle === undefined || isInputValid.subtitle ? '' : 'popup__error_visible'}`}>{errors.subtitle}</span>
            </label>
       </PopupWithForm> 
    )
}