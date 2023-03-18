const main = document.querySelector('main');
const search = document.querySelector('.search-container button');
const weatherContainer = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const input = document.querySelector('#textInput');

search.addEventListener('click', () => {
    const APY_KEY = "aa94ad38245df783938c3da44a3326cd";
    const city = document.querySelector('.search-container input').value;
    if (city === '') {
        return;
    }

    fetch(`http://api.weatherstack.com/current?access_key=${APY_KEY}&query=${city}`)
        .then(response => response.json())
        .then(json => {
            main.style.height = '550px';
            if (json.error) {
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

            switch (json.current.weather_descriptions[0]) {
                case 'Sunny':
                    image.src = 'img/sunny.svg';
                    break;
                case 'Rain':
                case 'Light Rain':
                case 'Light Rain, Mist':
                    image.src = 'img/rainy.svg';
                    break;
                case 'Mist':
                case 'Fog':
                case 'Haze':
                case 'Overcast':
                    image.src = 'img/fog.svg';
                    break;
                case 'Partly cloudy':
                case 'Clear':
                    image.src = 'img/partly_cloudy.svg';
                    break;
                case 'Snow':
                case 'Light Snow':
                case 'Light Snow, Mist':
                case 'Blizzard':
                case 'Light Rain And Snow':
                case 'Light Freezing Drizzle':
                case 'Light Freezing Drizzle, Light Snow':
                    image.src = 'img/snowy.svg';
                    break;
                case 'Ice Crystals':
                    image.src = 'img/freezing.svg';
                    break;
                default:
                    image.src = 'img/cloudy.svg';
            }

            temperature.innerHTML = `${parseInt(json.current.temperature)}<span>ºC</span>`;
            description.innerHTML = `${json.current.weather_descriptions}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_speed)} Km/h`;

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