import { APY_KEY } from "./config.js";


const main = document.querySelector('main');
const search = document.querySelector('.search-container button');
const weatherContainer = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const input = document.querySelector('#textInput');

search.addEventListener('click', () => {
    const city = document.querySelector('.search-container input').value;
    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APY_KEY}&units=metric`)
        .then(response => response.json())
        .then(json => {
            main.style.height = '550px';
            if (json.cod === '404') {
                weatherContainer.style.display = 'none';
                weatherDetails.style.display = 'none';
                notFound.style.display = 'block';
                notFound.classList.add('fade-in');
                return;
            }

            notFound.style.display = 'none';
            notFound.classList.remove('fade-in');

            const image = document.querySelector('.weather-container img');
            const temperature = document.querySelector('.weather-container .temperature');
            const description = document.querySelector('.weather-container .description');
            const humidity = document.querySelector('.weather-details .humidity p');
            const wind = document.querySelector('.weather-details .wind p');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/sunny.svg';
                    break;
                case 'Clouds':
                    image.src = 'img/cloudy.svg';
                    break;
                case 'Atmosphere ':
                    image.src = 'img/fog.svg';
                    break;
                case 'Rain':
                case 'Drizzle':
                    image.src = 'img/rainy.svg';
                    break;
                case 'Snow':
                    image.src = 'img/snowy.svg';
                    break;
                case 'Thunderstorm':
                    image.src = 'img/stormy.svg';
                    break;
                default:
                    image.src = 'img/partly_cloudy.svg';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherContainer.style.display = '';
            weatherDetails.style.display = '';
            weatherContainer.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
        });
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});