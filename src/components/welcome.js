// Opening page, API call, Computing the averages of the temparatures, humidity, pressures...

import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import Card from './Card';
function Nav() {
    const [formData, setFromData] = useState({'city': ''});
    const [Response, setResponse] = useState({});
    const [computedResopnse, setComputedResponse] = useState({});
    const [metric, setMetric] = useState(false);


    const handleSubmit = function (event) {

        event.preventDefault();
        // API call
        const units = metric ? 'imperial' : 'metric';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${
            formData.city
        }&appid=6d679d5f41918ac14b6aced5e6b3426f&cnt=40&units=${units}`;
        //console.log(url);
        axios.get(url).then((response) => { // Averaging the tempatures and humidity for a day
            const dailyForcast = {};
            response.data.list.map(item => {
                {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (! dailyForcast[date]) {
                        dailyForcast[date] = {
                            temp: [],
                            humidity: []
                        };
                    }

                    dailyForcast[date].temp.push(item.main.temp);
                    dailyForcast[date].humidity.push(item.main.humidity);
                    dailyForcast[date].icon = item.weather[0].icon;
                    dailyForcast[date].description = item.weather[0].description;
                    dailyForcast[date].pressure = item.main.pressure;
                    // console.log('item',item);
                }
            });

            Object.keys(dailyForcast).forEach(date => {
                const tempArray = dailyForcast[date].temp;
                const humidArray = dailyForcast[date].humidity;

                const tempAVG = (tempArray.reduce((a, b) => a + b, 0) / tempArray.length).toFixed(2);
                const humidAVG = (humidArray.reduce((a, b) => a + b, 0) / humidArray.length).toFixed(2);

                dailyForcast[date].temp = tempAVG;
                dailyForcast[date].humidity = humidAVG;
            })

            // console.log('filter',dailyForcast);

            setResponse((item) => {
                return {
                    ...response.data

                }
            });

            setComputedResponse((item) => {
                return {
                    ... dailyForcast
                }
            })
            // console.log(Response);
        }).catch((err) => {
            console.log('No City Found...', err);
        })

        // clear form after submit
        const form = document.forms['citySearch'];
        form.reset();
        return false;
    }

    const changeMetrics = () => {
        setMetric(!metric);
    }
    const handleFormData = function (event) { // console.log(formData);
        setFromData((p) => {
            return {
                ...p,
                [event.target.name]: event.target.value
            }
        })

    }
    const About = (
        <>
            <div class="modal fade" id="about" tabindex="-1" aria-labelledby="about" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="about_">About</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-left">
                            https://openweathermap.org/ Provides 3 hours granularity forecast per day.<br/>
                            The values are averaged and displayed.<br/>
                            If you change the Metrics, Search for the City again,<br/>
                            To get the right units and fresh data.<br/>
                            Metric: celcius/pascal<br/>
                            Imperical: Fahrenheit/PSI<br/>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light NavColor">
                <div className="container-fluid">
                    <a className="navbar-brand">W-Board</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 me-2 mb-lg-0">
                            <li className="nav-item">
                                <p className="nav-link active" data-bs-toggle="modal" data-bs-target="#about">About</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" aria-current="page"
                                    onClick={
                                        () => changeMetrics()
                                }>
                                    {
                                    `${
                                        metric ? 'Change Metrics' : 'Change Imperical'
                                    }`
                                }</p>
                            </li>
                        </ul>
                        <form className="d-flex" id="citySearch"
                            onSubmit={
                                (e) => handleSubmit(e)
                        }>
                            <input className="form-control me-2" type="text" name="city" placeholder="Search City"
                                onChange={
                                    (e) => handleFormData(e)
                                }
                                aria-label="Search"/>
                            <button className="btn btn-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <Card data={Response}
                computed={computedResopnse}
                Metric={metric}/> {
            ReactDOM.createPortal(About, document.getElementById('modal-root'))
        } </div>
    )
}

export default Nav;
