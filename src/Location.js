import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Location = () => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedCity, setSelectedCity] = useState("")


    useEffect(() => {
        const fetchCountries = async () => {
            try {

                const response = await axios.get(`https://crio-location-selector.onrender.com/countries`)
                setCountries(response.data)

            }
            catch (err) {
                console.log("Error while fetching countries: ", err)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        if (selectedCountry) {

            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((response) => {
                setStates(response.data)
                setSelectedState("")
                setCities([])
                setSelectedCity("")
            }).catch((error) => console.log("Error while fetching state: ", error))
        }
    }, [selectedCountry])

    useEffect(() => {

        if (selectedCountry && selectedState) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((response) => {
                setCities(response.data)
                setSelectedCity("")
            }).catch((error) => console.log("Error while fetching city: ", error))

        }
    }, [selectedState, selectedCountry])



    return (
        <>


            <h1>Select Location</h1>
            <div>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value={""} disabled>Select Country</option>
                    {
                        countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))
                    }
                </select>

                <select value={selectedState} disabled={!selectedCountry} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value={""} disabled>Select State</option>
                    {
                        states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))
                    }
                </select>

                <select value={selectedCity} disabled={!selectedState} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value={""} disabled>Select City</option>
                    {
                        cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))
                    }
                </select>

                {selectedCity && (
                    <p>You Selected <span style={{ color: "black", fontWeight: "600", fontSize: "22px" }}>{selectedCity}</span>,  <span style={{ color: "gray", fontSize: "16px" }}>  {selectedState}, {selectedCountry}</span></p>
                )}

            </div>
        </>
    )
}

export default Location