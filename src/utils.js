// Here I'll write the code to return lat and lon whenever user enters a city in input
// Making use of Geocoding API


export const getLatAndLon = async (userCity) => {
    const baseUrl = 'https://api.openweathermap.org/';
    const apiKey = '82140789032cc753d85a5d358bce5b17';
    const geoAPI = `${baseUrl}geo/1.0/direct?q=${userCity}&appid=${apiKey}`;

    const response = await fetch(geoAPI)

    if (response.status !== 200) {
        return false;
    }

    const weatherData = await response.json();

    const {lat, lon} = weatherData[0];
    return {lat, lon};
};