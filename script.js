const apiKey = 'e55087fc9fd596538788b4d9fc01226b';

const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

// Function to fetch weather information from the API
async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not available for the entered location. Please try again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        alert(error.message);
    }
}

// Function to display weather information
function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <div>Temperature: ${temperature}°C</div>
        <div>Description: ${description}</div>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
    `;
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        getWeather(location);
        locationInput.value = ''; // Clear input field after each submission
    } else {
        alert('Please enter your location.');
    }
});
