
//import './App.css';
import React, { useState, useEffect } from "react";



function WeatherSearch() {

    const [search, setSearch] = useState("London");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");

    let componentMount = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d21efa9d2533c8381153fa8a9d014c41`);
            if (componentMount) {
                setData(await response.json());
                // console.log(await response.json());
            }
            return () => {
                componentMount = false;
            }
        }
        fetchWeather();
    }, [search]);

    useEffect(()=>{
     console.log(data);
    }, [data])

    let emoji = null;
    if (data.main !== undefined) {
        if (data.weather[0]?.main == "Clouds")
            emoji = "fa-cloud";
        else if (data.weather[0]?.main == "Thunderstrom")
            emoji = "fa-bolt";
        else if (data.weather[0]?.main == "Drizzle")
            emoji = "fa-cloud-rain";
        else if (data.weather[0]?.main == "Rain")
            emoji = "fa-cloud-rain";
        else if (data.weather[0]?.main == "Snow")
            emoji = "fa-snow-flake";
        else
            emoji = "fa-smog";
    }
    else {
        return <div>Loading....</div>
    }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let max_temp = (data.main.temp_max - 273.15).toFixed(2);
    let min_temp = (data.main.temp_min - 273.15).toFixed(2);


    //date

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    // //time
    // let time = toLocaleString({
    //     hour : '2 digit',
    //     minute : '2 digit',
    //     second :'2 digit'
    // });
 const handleSubmit = (e)=>{
    e.preventDefault();
    setSearch(input);
 }
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center" >
                    <div className="col-md-4">
                        <div className="card bg-dark text-white border-0 text-center">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} className="card-img" alt="Loading..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input type="text"
                                            className="form-control shadow-none"
                                            placeholder="Search city"
                                            aria-label="Recipient's Search city"
                                            aria-describedby="basic-addon2" 
                                            name ="search"
                                            value ={input}
                                            onChange = {(e)=>setInput(e.target.value)}
                                            />
                                        <button type="submit" className="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>

                                </form>
                                <div className="bg-dark bg-opacity-50 py-3 justift-content-center">
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text lead">{day} , {date} {month} , {year}
                                        <br />
                                        {d.getHours()
                                            + ':' + d.getMinutes()
                                            + ":" + d.getSeconds()}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                                    <p className="lead fw-bolder">{data.weather[0].main}</p>
                                    <p className="lead">{min_temp} &deg;C | {max_temp} &deg;C</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherSearch;
