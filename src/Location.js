import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Location = () => {

    const [countryData, setCountryData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")

    const [stateData, setStateData] = useState([])
    const [selectedState, setSelectedState] = useState("")



    const [cityData, setCityData] = useState([])
    const [selectedCity, setSelectedCity] = useState("")

    const [msg, setMsg] = useState(false)

    useEffect(() => {
        const fetchCountry = async () => {
            const response = await axios.get('https://crio-location-selector.onrender.com/countries')
            setCountryData(response.data)
        }
        fetchCountry()
    }, [])

    const fetchState = async (country) => {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`)
        setStateData(response.data)
    }

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value)
        fetchState(e.target.value);
        setSelectedCity("")
        setSelectedState("")

    }


    const fetchCity = async (state, country) => {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        setCityData(response.data)
    }

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        fetchCity(e.target.value, selectedCountry)
        setSelectedCity("")
    }


    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
        setMsg(true)
    }

    return (

        <div>

            <h1 style={{ textAlign: "center" }}>Select Location</h1>

            <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "50px", marginLeft: "50px" }}>
                <select onChange={handleCountryChange} value={selectedCountry}>
                    <option>Select Country</option>
                    {
                        countryData.length > 0 ? countryData.map((data, idx) => (
                            <option key={idx}>{data}</option>
                        )) : null
                    }

                </select>

                <br />

                <select onChange={handleStateChange} value={selectedState} disabled={!selectedCountry}>
                    <option>Select State</option>
                    {
                        stateData.length > 0 ? stateData.map((data, idx) => (
                            <option key={idx}>{data}</option>
                        )) : null
                    }
                </select>

                <br />

                <select onChange={handleCityChange} value={selectedCity} disabled={!selectedState}>
                    <option>Select City</option>
                    {
                        cityData.length > 0 ? cityData.map((data, idx) => (
                            <option key={idx}>{data}</option>
                        )) : null
                    }
                </select>


            </div>

            <div style={{ marginTop: "20px" }}>

                {msg && `You Selected ${selectedCountry}, ${selectedState}, ${selectedCity}`}
            </div>
        </div>
    )
}

export default Location