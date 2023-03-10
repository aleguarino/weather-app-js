const main = document.querySelector('main');
const search = document.querySelector('.search-container button');
const weatherContainer = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', () => {
    console.log('a');
    const APY_KEY = "aa94ad38245df783938c3da44a3326cd";
    const city = document.querySelector('.search-container input').value;

    if (city === '') {
        return;
    }

    fetch(`http://api.weatherstack.com/current?access_key=${APY_KEY}&query=${city}`)
        .then(response => response.json())
        .then(json => {
            console.log(json.current.humidity);
            if (json.cod === '404') {
                main.style.height = '400px';
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
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            /*switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'img/rain.png';
                    break;
                case 'Clouds':
                    image.src = 'img/clouds.png';
                    break;
                case 'Haze':
                    image.src = 'img/haze.png';
                    break;
                case 'Snow':
                    image.src = 'img/snow.png';
                    break;
                default:
                    image.src = '';
            }*/

            temperature.innerHTML = `${parseInt(json.current.temperature)}<span>ºC</span>`;
            description.innerHTML = `${json.current.weather_descriptions}`;
            //humidity.innerHTML = `${json.current.humidity}%`;
            //wind.innerHTML = `${parseInt(json.current.wind_speed)}Km/h`;

            weatherContainer.style.display = '';
            weatherDetails.style.display = '';
            weatherContainer.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
        });
});