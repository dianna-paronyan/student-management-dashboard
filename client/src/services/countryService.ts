import urls from "../common/urls.ts";
import httpService from "./httpService.ts";
import Country from "../models/countryModel.ts";

function CountryService() {

    async function getCountries() {
        try {
            const countries = await httpService.get(urls.COUNTRIES);
            return countries;
        } catch (error) {
            throw error;
        }
    }

    async function createCountry(countryData: Country) {
        try {
            const country = await httpService.post(urls.COUNTRIES, countryData);
            return country;
        } catch (error) {
            throw error;
        }
    }

    return {getCountries, createCountry};
}

export default CountryService();