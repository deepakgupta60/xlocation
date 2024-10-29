import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'



const Location = () => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedCity, setSelectedCity] = useState("")


    const [loading, setLoading]=useState(true)

    const [error, setError]=useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            
            setLoading(true)
            try {

                const response = await axios.get(`https://crio-location-selector.onrender.com/countries`)
                setCountries(response.data)
                setSelectedState("")
                setSelectedCity("")

            }
            catch (err) {
                setError("Failed to load countries");
            }
            finally{
                setLoading(false)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        if (selectedCountry) {
            setLoading(true)
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((response) => {
                setStates(response.data)
                setSelectedState("")
                setSelectedCity("")
            }).catch((error) => setError("Failed to load states")).finally(()=>{
                setLoading(false)
            })
        }
    }, [selectedCountry])

    useEffect(() => {

        setLoading(true)
        if (selectedCountry && selectedState) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((response) => {
                setCities(response.data)
                setSelectedCity("")
            }).catch((error) => setError("Failed to load cities")).finally(()=>{
                setLoading(false)
            })

        }
    }, [selectedState, selectedCountry])

if(loading) return <p>Loading...</p>

if(error) return <p>{error}</p>

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