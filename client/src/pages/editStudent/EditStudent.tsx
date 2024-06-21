import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import StudentService from "../../services/studentService.ts";
import {useParams} from "react-router-dom";
import {Student} from "../../models/studentModel.ts";
import CountryService from "../../services/countryService.ts";
import CityService from "../../services/cityService.ts";
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import Country from "../../models/countryModel.ts";
import City from "../../models/cityModel.ts";

function EditStudent() {
    const {id} = useParams();
    const [student, setStudent] = useState<Student>({} as Student);
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | undefined>();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        countryId: 0,
        cityId: 0,
    });

    useEffect(() => {
        async function fetchCountries() {
            await getCountries();
        }

        async function fetchStudent() {
            await getStudent();
        }

        fetchCountries().catch((error) => console.error(error));
        fetchStudent().catch((error) => console.error(error));
    }, [id]);

    async function getStudent() {
        try {
            const studentData = await StudentService.getStudent(id);
            setStudent(studentData);
            console.log(student);
            setFormData({
                email: studentData.email,
                password: studentData.password,
                firstName: studentData.firstName,
                lastName: studentData.lastName,
                age: studentData.age,
                countryId: studentData.countryId,
                cityId: studentData.cityId
            });
            setSelectedCountry(studentData.countryId);
            if (studentData.countryId) {
                const citiesResponse = await CityService.getCitiesByCountryId(studentData.countryId);
                setCities(citiesResponse);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getCountries() {
        try {
            const countriesResponse = await CountryService.getCountries();
            setCountries(countriesResponse);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleCountryChange(event: SelectChangeEvent<number>) {
        const countryId = event.target.value as number;
        setSelectedCountry(countryId);

        setFormData({...formData, countryId: countryId, cityId: 0});

        try {
            if (countryId) {
                const citiesResponse = await CityService.getCitiesByCountryId(countryId);
                setCities(citiesResponse);
            } else {
                setCities([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    function handleCityChange(event: SelectChangeEvent<number>) {
        const {name, value} = event.target;
        setFormData({...formData, [name!]: value});
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const studentData = {
                id: Number(id),
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                age: parseInt(formData.age),
                countryId: formData.countryId,
                cityId: formData.cityId
            };
            await StudentService.updateStudent(studentData, studentData.id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Edit Student</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="age"
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            required
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                id="country"
                                name="countryId"
                                value={selectedCountry || ""}
                                onChange={handleCountryChange}
                                fullWidth
                            >
                                <MenuItem value="">Select Country</MenuItem>
                                {countries.map((country: Country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city"
                                name="cityId"
                                value={formData.cityId || ""}
                                onChange={handleCityChange}
                                fullWidth
                                disabled={!selectedCountry || cities.length === 0}
                            >
                                <MenuItem value="">Select City</MenuItem>
                                {cities.map((city: City) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!selectedCountry || !formData.cityId}
                        >
                            Update Student
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default EditStudent;