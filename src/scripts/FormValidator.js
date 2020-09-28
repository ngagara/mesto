export default class FormValidator {
    constructor(form, button) {
        this.form = form;
        this.button = button;
    };
    checkInputValidity(input, error) {
        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessages.valueMissing);
        } else if (input.validity.tooShort) {
            input.setCustomValidity(errorMessages.tooShort);
        } else if (input.validity.typeMismatch && input.type === "url") {
            input.setCustomValidity(errorMessages.typeMismatch);
        } else {
            input.setCustomValidity("");
        }
        error.textContent = input.validationMessage;
    };

    setSubmitButtonState(state) {
        if (state) {
            this.button.classList.add("popup__button_activ"); 
            this.button.removeAttribute("disabled");
        } else {
            this.button.classList.remove("popup__button_activ");
            this.button.setAttribute("disabled", true);
        }
    };

    setEventListeners() {
        this.form.addEventListener("input", (event) => {
            const input = event.target;
            const error = this.form.querySelector(`#${input.id}-error`);
            this.checkInputValidity(input, error);
            this.setSubmitButtonState(this.form.checkValidity());
        });
    };
    
    resetForm() {
        this.form.reset();
    };

    resetError() {
        this.form.querySelectorAll(".error").forEach(function (item) {
          item.textContent = "";
        });
      };
}