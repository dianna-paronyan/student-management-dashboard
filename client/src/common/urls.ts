import {environment} from "../environments/environment.ts";

const urls = {
    STUDENTS: environment.baseUrl + '/students',
    COUNTRIES: environment.baseUrl + '/countries',
    CITIES: environment.baseUrl + '/cities',
};

export default urls;