export default class Popup {
    constructor(popupContainer) {
        this.popupContainer = popupContainer; 
      
    };
    open = () => {
        this.popupContainer.classList.add("popup_is-opened");
        this._setListeners(); 
    };
    close = () => {
        this.popupContainer.classList.remove("popup_is-opened");
        this._removeListeners(); 
    }; 
    _setListeners() {
        this.popupContainer.querySelector(".popup__close").addEventListener('click', this.close);

    };
    _removeListeners() {
        this.popupContainer.querySelector(".popup__close").removeEventListener('click', this.close);
    };
}