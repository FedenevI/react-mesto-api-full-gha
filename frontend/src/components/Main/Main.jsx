import { useContext } from "react"
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Spinner from "../Spinner/Spinner";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardOpen, onDelete, cards, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
    return(
        <main className="main">
      {/* Profile start */}
      <section className="profile">
        <div className="profile__items">
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar ? currentUser.avatar : '#'}
              alt="аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
            <p className="profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="редактированить профиль"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить карточку"
          onClick={onAddPlace}
        />
      </section>
      {/* Profile end */}
      {/* Elements start */}
      <section className="elements">    
          {isLoading ? <Spinner /> : cards.map(element => {
            return(
            <div id="place-template" key={element._id}> 
            <Card card={element} onCardOpen={onCardOpen} onDelete={onDelete}/>
            </div>
            )
          })}
      </section>
      {/* Elements end */}
    </main>
    )
}