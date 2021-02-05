import api from '../service/apiService';

class Locations {
    constructor() {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = countries;
        this.cities = cities;

        return response;
    }

    getCitiesbyCountryCode(code) {
        return this.cities.filter(city => city.country_code === code);
    }
}

const locations = new Locations(api);


export default locations;