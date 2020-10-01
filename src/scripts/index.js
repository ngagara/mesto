import Api from "./Api.js";
import Card from "./Card.js";
import CardList from "./CardList.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css"

(function () {
  'use strict';

  const buttonAdd = document.querySelector(".button_add-card");
  const buttonSave = document.querySelector(".button_save-info");
  const buttonOpenAdd = document.querySelector(".button_open-add");
  const buttonOpenEdit = document.querySelector(".button_open-edit");
  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");
  const inputName = document.querySelector("#user-name");
  const inputInfo = document.querySelector("#user-info");

  const addPopupForm = document.forms.newCard;
  const editPopupFrorm = document.forms.editPopupForm;

  const isDev = process.env.NODE_ENV === 'development';
  const server = isDev ? 'https://nomoreparties.co/cohort11' : 'http://nomoreparties.co/cohort11';

  const api = new Api({
    baseUrl: server,
    headers: {
      authorization: 'a0621f41-ad7c-4fb1-8764-077b435bf777',
      'Content-Type': 'application/json'
    }
  });

  const createCard = (name, link) => new Card(name, link, openPopupImage);

  const popupAddCard = new Popup(document.querySelector(".popup_add-card"));
  const popupEditInfo = new Popup(document.querySelector(".popup_edit-info"));
  const popupImage = new Popup(document.querySelector(".popup_image"));

  const addFormValidator = new FormValidator(addPopupForm, buttonAdd);
  const editFormValidator = new FormValidator(editPopupFrorm, buttonSave);

  const cardList = new CardList(document.querySelector(".places-list"), createCard);

  const userInfo = new UserInfo({ userName, userJob });

  api.getInitialCards().then((result) => {
    cardList.render(result);
  }).catch((err) => {
    console.log(err);
  });;

  api.getUserInfo().then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    document.querySelector(".user-info__photo").setAttribute("style", `background-image: url(${result.avatar})`)
  }).catch((err) => {
    console.log(err);
  });

  function openPopupImage(link) {
    document.querySelector(".popup__picture").setAttribute("src", link);
    popupImage.open();
  };

  buttonOpenEdit.addEventListener("click", () => {
    editFormValidator.resetError();
    userInfo.updateUserInfo(inputName, inputInfo);
    editFormValidator.setSubmitButtonState(true);
    popupEditInfo.open();
  });

  buttonOpenAdd.addEventListener("click", () => {
    addFormValidator.resetError();
    addFormValidator.resetForm();
    addFormValidator.setSubmitButtonState(false);
    popupAddCard.open();
  });

  buttonAdd.addEventListener("click", (event) => {
    event.preventDefault();
    cardList.addCard(addPopupForm.elements.name.value, addPopupForm.elements.link.value);
    popupAddCard.close();
  });

  buttonSave.addEventListener("click", (event) => {
    event.preventDefault();
    api.editUserInfo(inputName.value, inputInfo.value).then(() => {
      userInfo.setUserInfo(inputName.value, inputInfo.value);
      popupEditInfo.close();
    }).catch((err) => {
      console.log(err);
    });
  });

  addFormValidator.setEventListeners();
  editFormValidator.setEventListeners();

})();


