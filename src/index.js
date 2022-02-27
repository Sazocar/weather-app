import { deleteAllCards } from "./utils";

const baseUrl = 'https://api.openweathermap.org/'
const apiKey = '82140789032cc753d85a5d358bce5b17';
const es = 'es';
const unit = 'metric';

export const cards_container = document.querySelector('.cards-container');
const checkWeatherButton = document.querySelector('.input-button');
const cityInput = document.querySelector('.user-input');
const deleteButton = document.querySelector('.delete-button');

export let cards = [];

const getUserInput = () => {
    const inputRef = document.querySelector('.user-input');
    return inputRef.value;    
};

let city;

checkWeatherButton.addEventListener('click', () => {
    city = getUserInput();
    cityInput.value = '';
});

cityInput.addEventListener('keydown', (e) =>{
    if (e.code === 'Enter') {
        city = getUserInput();
        addWeatherCard();
        cityInput.value = '';
    }
});

deleteButton.addEventListener('click', deleteAllCards);


const addWeatherCard = () => {
    let  weatherAPI = `${baseUrl}data/2.5/weather?q=${city}&appid=${apiKey}&lang=${es}&units=${unit}`
    window.fetch(weatherAPI)
    .then(response => response.json())
    .then(jsonResponse => {
        const weatherData = jsonResponse;

        const {name, sys, main, weather, id} = weatherData;
        
        if (isInserted(id)) {
            cityInput.classList.add('bad-input');
            cityInput.placeholder = 'Weather already consulted';
            cityInput.value = '';
        }
        else {
            console.log(`${name}, ${sys.country}, ${main.temp}°C, ${weather[0].description}, ${weather[0].icon}, ${id}`);

            // Now we create HTML elements for weather card
            const card = document.createElement('div');
            card.id = id;
            card.className = 'card w-56 h-72 rounded-lg px-6 py-8';
            // card.className = 'card md:flex bg-gray-800 rounded-lg p-6 hover:bg-gray-600';
    
            const city_name = document.createElement('h2');
            city_name.textContent = name;
            city_name.className = 'city w-32 text-purple-50 text-3xl font-bold';
    
            const country_name = document.createElement('span');
            country_name.textContent = sys.country;
            country_name.className = 'w-8 mt-7 bg-yellow-400 text-black font-bold text-center text-sm rounded-lg';
    
            const close = document.createElement('img');
            close.src = 'https://img.icons8.com/plumpy/24/000000/macos-close.png';
            close.className = 'close absolute inset-y-0 right-1 mt-3 mr-2';
    
            const temp = document.createElement('h1');
            temp.textContent = parseInt(main.temp) + '°C';
            temp.className = 'tempeture text-white text-center text-7xl font-light';
    
            const weather_icon = document.createElement('img');
            weather_icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
            weather_icon.className = 'mx-auto h-20';
    
            const description = document.createElement('p');
            description.textContent = weather[0].description;
            description.className = 'description capitalize font-light text-center text-white';
    
            card.append(city_name, close, temp, weather_icon, description);
            
            city_name.appendChild(country_name);
            
            cards_container.insertAdjacentElement('afterbegin', card);

            cityInput.classList.remove('bad-input');
            cityInput.placeholder = 'Enter a city or country';
            cards.push(id);
        }
    })  
    .catch(() =>{
        cityInput.classList.add('bad-input');
        cityInput.placeholder = 'Location not valid, try again';
        cityInput.value = '';
    });
};

checkWeatherButton.addEventListener('click', addWeatherCard);


const deleteCard = (event) => {
    if ((event.target.nodeName === 'IMG') && event.target.classList[0] == 'close'){
        const card_id = event.target.offsetParent.id;
        const cardRef = document.getElementById(card_id);
        const index = cards.indexOf(parseInt(card_id));

        cards.splice(index, 1);
        cards_container.removeChild(cardRef);
        debugger;
    }
}

cards_container.addEventListener('click', deleteCard);

const isInserted = (id) => {
    if (cards.includes(id)) {
        console.log('Already added');
        return true;
    }
    else {
        console.log('not added');
        return false;
    }
}