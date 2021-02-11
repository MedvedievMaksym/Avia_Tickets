import api from '../service/apiService';

class Locations {
    constructor() {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = this.serialazeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);

        return response;
    }


    getCityCodeByKey(key) {
        return this.cities[key].code;
    }

    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [key]) => {
            acc[key] = null;
            return acc;
        }, {});
    }

    /* Конвертируем полученные данные от сервера по странам
    и получаем код страны */
    serialazeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    /* Конвертируем полученные данные от сервера по городам
    для получения кода города и отправки его на сервер */
    serializeCities(cities) {
        return cities.reduce((acc, cities) => {
            const country_name = this.getCountryNameByCode(cities.country_code);
            const city_name = cities.name || cities.name_translations.en;
            const key = `${city_name},${country_name}`;
            acc[key] = cities;
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const locations = new Locations(api);


export default locations;