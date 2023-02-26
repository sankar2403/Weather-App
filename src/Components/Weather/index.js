import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/index";
import './style.css'

const Weather = () => {

    let [city, setCity] = useState("")
    let [weather, setWeather] = useState([])
    let [flag, setFlag] = useState(false)


    const changeHandler = ({ target: { value } }) => {
        setCity(value)
        if (!city) {
            setFlag(false)
        }
    }

    const submitHandler = async () => {
        if (city) {
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
                .then((res) => setWeather([res]))
                .catch(error => console.log(error))

            setTimeout(() => {
                setFlag(true)
            }, 100);
        }
    }

    return (
        <div className="main-container">
            <Header />
            <div className="container">
                <div className="input-container">
                    <input type="text"
                        onChange={changeHandler}
                        className="input-field"
                        placeholder="Enter the City or Country" />
                </div>
                <div className="button-container">
                    <button type="submit"
                        onClick={submitHandler}
                        className="submit-button">GET WEATHER</button>
                </div>
            </div>

            {city ?
                weather.map(item => {
                    console.log(item);
                    const { data: { name, id, main: { temp, humidity }, weather: [{ description }] } } = item
                    return (
                        <div
                            key={id}
                            className="cards">
                            <div className={flag ? "datas1" : "datas1a"}>
                                <h3>Place</h3>
                                <h3>{name} <i class="fa-solid fa-location-dot"></i></h3>
                            </div>
                            <div className={flag ? "datas2" : "datas2a"}>
                                <h3>Temperature</h3>
                                <h3>{Math.round((temp) - 273.15)} &#8451; <i class="fa-solid fa-temperature-half"></i></h3>
                            </div>

                            <div className={flag ? "datas1" : "datas1a"}>
                                <h3>Humidity</h3>
                                <h3>{humidity} % <i class="fa-regular fa-droplet-percent"></i></h3>
                            </div>
                            <div className={flag ? "datas2" : "datas2a"}>
                                <h3>Sky</h3>
                                <h3>{description}</h3>
                            </div>
                        </div>)
                }) : ""
            }
        </div>
    );
}


export default Weather