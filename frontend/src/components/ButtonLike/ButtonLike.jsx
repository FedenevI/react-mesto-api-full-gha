import { useEffect, useState } from "react"
import api from "../../utils/api"

//отдельный компонент, чтобы не рендерить всё приложение

export default function ButtonLike({ likes, meID, cardid }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(item => meID === item))
    }, [likes, meID])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardid, localStorage.jwt)
                .then(res => {
                    setIsLike(false)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`Ошибка лайка ${err}`))
        } else {
            api.addLike(cardid, localStorage.jwt)
                .then(res => {
                    setIsLike(true)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`Ошибка лайка ${err}`))
        }
    }

    return (
        <>
            <div className="element__like-section">
                <button
                    className={`element__like-but ${isLike ? 'element__like_active' : ''}`}
                    type="button"
                    aria-label="Нравиться"
                    onClick={handleLike}
                />
                <span className="element__counter">{count}</span>
            </div>
        </>
    )
}