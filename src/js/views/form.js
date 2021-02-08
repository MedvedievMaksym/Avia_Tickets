import {getAutocompleteInstanse, getDatePickerInstanse} from '../plugins/materialize';


class FormUI {
    constructor(autocompleteInstanse, datePickerInstanse) {
        /*получаем елем со страницы */
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        /* instance для вызова методов из materialize*/
        this.originAutocomplete = autocompleteInstanse(this.origin);
        this.destinationAutocomplete = autocompleteInstanse(this.destination);
        this.departDatePicker = datePickerInstanse(this.depart);
        this.returnDatePicker = datePickerInstanse(this.return);


    }

    get form() {
        return this.$form;
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstanse, getDatePickerInstanse);

export default formUI;