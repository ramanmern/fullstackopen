import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [weather, setWeather] = useState([])

    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${api_key}`).then(response => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}`).then(res => setWeather(res.data)))
    }, [])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    if (!isOpen) {
        return <p>{country.name.common} <button onClick={handleOpen}>{isOpen ? 'Close' : 'Open'}</button></p>
    }

    console.log(weather);

    return (
        <div>
        <p>{country.name.common} <button onClick={handleOpen}>{isOpen ? 'Close' : 'Open'}</button></p>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <p>Languages:</p>
        <ul>
            {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={country.flags.png} alt="Country flag" />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {Math.round(weather.main.temp - 273.15)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        <p>Wind: {weather.wind.speed} m/s</p>
    </div>
    )

    
}

export default Country