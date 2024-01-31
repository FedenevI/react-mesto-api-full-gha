import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ButtonLike from "../ButtonLike/ButtonLike";

export default function Card({ card, onCardOpen, onDelete }) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <article className="element">
            {currentUser._id === card.owner && <button className="element__trash-button" type="button" onClick={() => onDelete(card._id)} />}
            <img
                className="element__img"
                alt={`Изображение ${card.name}`}
                src={card.link}
                onClick={() => onCardOpen({ link: card.link, name: card.name })} />
            <div className="element__description">
                <div className="element__sign">
                    <h2 className="element__title">{card.name}</h2>
                    <ButtonLike likes={card.likes} meID={currentUser._id} cardid={card._id} />
                </div>
            </div>
        </article>
    )
}