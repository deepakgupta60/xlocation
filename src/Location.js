import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Location = () => {
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedCity, setSelectedCity] = useState("")

    const [countryData, setCountryData] = useState([])
    const [stateData, setStateData] = useState([])
    const [cityData, setCityData] = useState([])


    useEffect(() => {
        const fetchCountry = async () => {
            let response = await axios.get('https://crio-location-selector.onrender.com/countries')
            setCountryData(response.data)
        }
        fetchCountry()
    }, [])

    useEffect(()=>{
        fetchState(selectedCountry)
    },[selectedCountry])

    const handleCountryChange = (e) => {
        selectedCountry(e.target.value)
    }

    const handleStateChange=()=>{
        
    }
    const handleCityChange=()=>{

    }
    const fetchState = async (country) => {
        let response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
        setStateData(response.data)
    }
    const fetchCity = async (country, state) => {
        let response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        setCityData(response.data)
    }

    return (
        <>
            <select onChange={handleCountryChange}>
                <option>Select Country</option>
                {countryData.length > 0 ? countryData.map((data) => <option>{data}</option>) : <option>Not found country</option>}
            </select> <br/>


            <select onChange={handleStateChange}>
                <option>Select State</option>
                {stateData.length > 0 ? stateData.map((data) => <option>{data}</option>) : <option>Not found State</option>}
            </select>
        <br/>
            <select onChange={handleCityChange}>
                <option>Select State</option>
                {stateData.length > 0 ? stateData.map((data) => <option>{data}</option>) : <option>Not found State</option>}
            </select>

        </>
    )
}

export default Location