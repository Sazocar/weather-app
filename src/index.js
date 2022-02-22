import { getLatAndLon } from "./utils";



const city = 'Barcelona';   // Se la tengo que pedir al usuario y pasar como argumento
const baseUrl = 'https://api.openweathermap.org/'
const apiKey = '82140789032cc753d85a5d358bce5b17';
const es = 'es';
const unit = 'metric';

const cards_container = document.querySelector('.cards-container');

let info = getLatAndLon(city);

info.then(value => {
    // We get latitude and longited from getLatAndLon function

    const latitude = value.lat;
    const longitude = value.lon;
    console.log(latitude, longitude);
    
    // Generate the weatherAPI using latitud and longitud
    const weatherAPI = `${baseUrl}data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${es}&units=${unit}`


    window.fetch(weatherAPI)
        .then(response => response.json())
        .then(jsonResponse => {
            const weatherData = jsonResponse;
    
            const {name, sys, main, weather, id} = weatherData;
            console.log(`${name}, ${sys.country}, ${main.temp}°C, ${weather[0].description}, ${weather[0].icon}, ${id}`);

            // Now we create HTML elements for weather card
            const card = document.createElement('div');
            card.id = id;
            card.className = 'card';

            const city_name = document.createElement('h2');
            city_name.textContent = name;

            const country_name = document.createElement('span');
            country_name.textContent = sys.country;

            const close = document.createElement('img');
            close.src = '' // PENDIENTE POR HACER !!!!!!!! -----------------------------
            close.className = 'w-4'
            const temp = document.createElement('h1');
            temp.textContent = main.temp;

            const weather_icon = document.createElement('img');
            weather_icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            const description = document.createElement('p');
            description.textContent = weather[0].description;

            card.append(city_name, country_name, close, temp, weather_icon, description);
            
            cards_container.append(card);
        });
});
   