export default class Card {
    constructor(name, link, openPopupImage) {
        this.name = name; 
        this.link = link; 
        this.openPopupImage = openPopupImage;
    };
    like() {
        this.classList.toggle("place-card__like-icon_liked");
    };
    remove = () => {
        this._removeListeners(); 
        this.cardElement.remove();
        this.cardElement = null;
    };
    create() {
        const placeCard = this._createAndAddClass("div", "place-card");
        const cardsImage = this._createAndAddClass("div", "place-card__image");
        cardsImage.setAttribute("style", `background-image: url(${this.link})`);
        const deleteIcon = this._createAndAddClass("button", "place-card__delete-icon");
        const cardsDescription = this._createAndAddClass("div", "place-card__description");
        const cardsName = this._createAndAddClass("h3", "place-card__name");
        cardsName.textContent = this.name;
        const cardLikeItem = this._createAndAddClass("button", "place-card__like-icon");

        placeCard.appendChild(cardsImage);
        cardsImage.appendChild(deleteIcon);
        placeCard.appendChild(cardsDescription);
        cardsDescription.appendChild(cardsName);
        cardsDescription.appendChild(cardLikeItem);

        this.cardElement = placeCard; 

        this._setListeners(); 

        return placeCard; 
    };
    _createAndAddClass(tag, classes) {
        const element = document.createElement(tag);
        element.classList.add(classes);
        return element; 
    };
    getLink = () =>{
        this.openPopupImage(this.link)
    };
    _setListeners() {
        this.cardElement.querySelector(".place-card__image").addEventListener('click', this.getLink); 
        this.cardElement.querySelector(".place-card__like-icon").addEventListener('click', this.like); 
        this.cardElement.querySelector(".place-card__delete-icon").addEventListener('click', this.remove); 
    };
    _removeListeners() {
        this.cardElement.querySelector(".place-card__image").removeEventListener('click', this.getLink); 
        this.cardElement.querySelector(".place-card__like-icon").removeEventListener('click', this.like); 
        this.cardElement.querySelector(".place-card__delete-icon").removeEventListener('click', this.remove);
    };
}
