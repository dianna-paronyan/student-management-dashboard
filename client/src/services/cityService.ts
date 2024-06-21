import urls from "../common/urls.ts";
import httpService from "./httpService.ts";
import City from "../models/cityModel.ts";

function CityService() {

    async function getCities() {
        try {
            const cities = await httpService.get(urls.CITIES);
            return cities;
        } catch (error) {
            throw error;
        }
    }

    async function getCity(id: number) {
        try {
            const city = await httpService.get(urls.CITIES, id);
            return city;
        } catch (error) {
            throw error;
        }
    }

    async function getCitiesByCountryId(countryId: number) {
        try {
            const citiesByCountryId = await httpService.get(`${urls.CITIES}/country`, countryId);
            return citiesByCountryId;
        } catch (error) {
            throw error;
        }
    }

    async function createCity(cityData: City) {
        try {
            const city = await httpService.post(urls.CITIES, cityData);
            return city;
        } catch (error) {
            throw error;
        }
    }

    return {getCities, getCity, getCitiesByCountryId, createCity};
}

export default CityService();