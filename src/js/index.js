export default class CRM {
    constructor(products) {  
        this.products = products;
        this.addProductIcon = document.getElementsByClassName('add-product').item(0);
        this.popup = document.getElementsByClassName('popup').item(0);
        this.buttonCancel = document.getElementsByClassName('form__cancel').item(0);
        this.inputName = document.getElementsByClassName('form__input-name').item(0);
        this.inputPrice = document.getElementsByClassName('form__input-price').item(0);
        this.form = document.getElementsByClassName('form').item(0);
        this.nameInvalid = document.getElementsByClassName('form__name-invalid').item(0);
        this.priceInvalid = document.getElementsByClassName('form__price-invalid').item(0);
        this.box = document.getElementsByClassName('page__row-box').item(0);
        this.table = document.getElementsByClassName('page__table').item(0);
        this.invalidEl = null;
        this.updateElindexb = null;
        this.onUpdate = null;
    }
    
    init() {
        // open popup
        this.addProductIcon.addEventListener('click', () => {
            this.popup.classList.toggle('popup-hidden');
            this.formAndTooltipCliner()
            this.inputName.focus();
        });
        
        // cancel
        this.buttonCancel.addEventListener('click', e => {
            e.preventDefault();
            this.popup.classList.toggle('popup-hidden');
            this.onUpdate = null;
        });
        
        // create element and save in memory - this.products.list
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const isValid = this.validator();
            if(this.onUpdate && isValid) return this.upadateEl();
            if(isValid) this.createAndSaveEl();   
        });
        // delete element
        this.table.addEventListener('click', e => {
            
            if(e.target.classList.contains('page__delete')) {
                const deletedElIndex = e.target.closest('.page__row').dataset.id;
                this.products.list.splice(deletedElIndex, 1);
                this.products.redRaw(this.box); 
            };

        // update element
            if(e.target.classList.contains('page__pensil')) {
                this.popup.classList.toggle('popup-hidden');
                this.updateElindex = e.target.closest('.page__row').dataset.id;
                this.onUpdate = true;
                this.inputName.value = this.products.list[this.updateElindex].name;
                this.inputPrice.value = this.products.list[this.updateElindex].price; 
            }; 
        });
    }

    validator() {
        const inValid = [];
        if(!this.inputName.value) {
            this.nameInvalid.textContent = 'Введите название товара';
            this.inputName.focus();
            inValid.push('invalid')
        } else {
            this.nameInvalid.textContent = '';
        }
    
        if(isNaN(this.inputPrice.value) || !this.inputPrice.value || this.inputPrice.value <= 0) {
            this.priceInvalid.textContent = 'Введите цену товара цифрами более нуля';
            this.inputPrice.focus();
            inValid.push('invalid')
        } else {
            this.priceInvalid.textContent = '';
        }

        if(!inValid.length) {
            this.popup.classList.toggle('popup-hidden');
            
            return true;
        }  
    }

    formAndTooltipCliner() {
        this.inputName.value = '';
        this.inputPrice.value = '';
        this.nameInvalid.textContent = '';
        this.priceInvalid.textContent = '';
    }

    createAndSaveEl() {
        this.products.list.push({
            name: this.inputName.value,
            price: this.inputPrice.value,
            id: this.products.list.length
        });
        this.products.redRaw(this.box);   
    }

    upadateEl() {
        this.products.list[this.updateElindex].name = this.inputName.value;
        this.products.list[this.updateElindex].price = this.inputPrice.value;
        this.products.redRaw(this.box);
        this.onUpdate = null;        
    }
}

