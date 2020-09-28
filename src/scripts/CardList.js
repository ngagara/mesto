export default class CardList {
    constructor(container, createCard) {
        this.container = container;
        this.createCard = createCard;
 
    }
    addCard(name, link) {
        this.container.appendChild(this.createCard(name, link).create());
    }
    render(data) {
        data.forEach(item => {
           this.addCard(item.name, item.link);
        });
    }
} 
