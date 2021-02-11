import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    /* Events */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormsubmit();
    });


    /* Handlers */
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }


    /* Собираем данные из input для отправки на сервер */
    async function onFormsubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.retunrDateValue;

        console.log(origin, destination, depart_date, return_date);
    }
});