export interface Student {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    countryId: number;
    cityId: number;
    Country?: {
        id: number;
        name: string;
    };
    City?: {
        id: number;
        name: string;
    };
}
