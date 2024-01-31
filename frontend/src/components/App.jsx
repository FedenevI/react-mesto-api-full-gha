import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { auth } from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import complete from '../images/yes.svg';
import error from '../images/no.svg';

function App() {
  // popup state
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // context state
  const [CurrentUser, setCurrentUser] = useState({})
  const [currentMail, setCurrentMail] = useState('');

  // card state
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState('');

  // log state
  const [loggedIn, setLoggedIn] = useState(false);
  const [textStatusRegisterPopup, setTextStatusRegisterPopup] = useState('');
  const [statusRegisterPopup, setStatusRegisterPopup] = useState(false);
  const [avatarStatusRegisterPopup, setAvatarStatusRegisterPopup] = useState(null);

  const navigate = useNavigate();

  const handleRegistration = (email, password) => {
    setIsSending(true);
    auth.registration(email, password)
      .then(() => {
        setStatusRegisterPopup(true);
        setTextStatusRegisterPopup('Вы успешно зарегистрировались!');
        setAvatarStatusRegisterPopup(complete);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setStatusRegisterPopup(true);
        setTextStatusRegisterPopup('Что-то пошло не так! Попробуйте ещё раз.');
        setAvatarStatusRegisterPopup(error);
        console.log(err);
      })
      .finally(() => setIsSending(false))
  }

  const handleLogin = (email, password) => {
    setIsSending(true);
    auth.Login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setCurrentMail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setStatusRegisterPopup(true);
        setTextStatusRegisterPopup('Что-то пошло не так! Попробуйте ещё раз.');
        setAvatarStatusRegisterPopup(error);
        console.log(err);
      })
      .finally(() => setIsSending(false));
  }

  const handleCheckToken = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentMail(res.email);
            setLoggedIn(true)
            navigate('/', { replace: true });
          }
        })
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleExit = () => {
    localStorage.removeItem('jwt');
    setCurrentMail('');
    navigate('/sign-in', { replace: true });
  }

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setOpenImage(false);
    setDeletePopupOpen(false);
    setStatusRegisterPopup(false);
    setAvatarStatusRegisterPopup(false);
  }, []);

  const closePopupEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups()
      document.removeEventListener('keydown', closePopupEsc)
    }
  }, [closeAllPopups])

  const closePopups = useCallback(() => {
    closeAllPopups();
    document.removeEventListener('keydown', closePopupEsc);
  }, [closeAllPopups, closePopupEsc])

  function closeEsc() {
    document.addEventListener('keydown', closePopupEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    closeEsc()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    closeEsc()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    closeEsc()
  }

  function HadleCardOpen(card) {
    setSelectedCard(card);
    setOpenImage(true);
    closeEsc()
  }

  function HandleDeletePopupClick(cardid) {
    setDeleteCardId(cardid)
    setDeletePopupOpen(true);
    closeEsc()
  }


  useEffect(() => {
    if (loggedIn) {
      setLoadingCards(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser)
          setCards(dataCard);
          setLoadingCards(false)
        })
        .catch(error => console.error(`Ошибка при попытке загрузить карточки ${error}`))
    }
  }, [loggedIn])

  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.deleteCardID(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closePopups()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при попытке удаления карточки ${err}`))
      .finally(() => setIsSending(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSending(true)
    api.setInfoProfile(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closePopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при попытке редактировать профиль ${err}`))
      .finally(() => setIsSending(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSending(true)
    api.setInfoAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closePopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при попытке редактировать аватар ${err}`))
      .finally(() => setIsSending(false))
  }

  function handleAddCard(dataCard, reset) {
    setIsSending(true)
    api.addNewCard(dataCard, localStorage.jwt)
      .then(res => {
        setCards([res, ...cards])
        closePopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при попытке добавить карточку ${err}`))
      .finally(() => setIsSending(false))
  }

  return (
    <>
      <CurrentUserContext.Provider value={CurrentUser}>
        <div className="page">
          {/* Header start */}
          <Header mail={currentMail} exit={handleExit} />
          {/* Header end */}

          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardOpen={HadleCardOpen}
                onDelete={HandleDeletePopupClick}
                cards={cards}
                isLoading={isLoadingCards}
              />
            } />

            <Route path="/sign-in" element={<Login handleLogin={handleLogin} statusText={setIsSending} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegistration} statusText={setIsSending} />} />
          </Routes>

          { /*
    <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardOpen = {HadleCardOpen}
      onDelete = {HandleDeletePopupClick}
      cards={cards}
      isLoading={isLoadingCards}
    />
    */}

          {/* Footer start */}

          <Footer />
          {/* Footer start */}
        </div>

        <InfoTooltip
          isOpen={statusRegisterPopup}
          isClose={closePopups}
          logo={avatarStatusRegisterPopup}
          name={textStatusRegisterPopup}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closePopups}
          isSend={isSending}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closePopups}
          isSend={isSending}
          onAddPlace={handleAddCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closePopups}
          isSend={isSending}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='popup-delete'
          title='Вы уверены?'
          titleBtn='да'
          isOpen={isDeletePopupOpen}
          isClose={closePopups}
          onSubmit={handleDeleteSubmit}
          isSend={isSending}
        />

        <ImagePopup card={selectedCard} isOpen={openImage} isClose={closePopups} />

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
