import DistrictCityData from '../resources/DistrictCityData.json'
import NUMBER_OF_DAYS from '../resources/static'

export function getCurrentDate() {
    let currentDate = new Date();
    return getFormatedDate(currentDate);
}

// formats a date object to YYYY-MM-DD format
function getFormatedDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// returns the dates for the forecast in YYYY-MM-DD format
export function getDates(numberOfDays) {
    let days = [];

    for (let i = 0; i < numberOfDays; i++) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        days.push(getFormatedDate(currentDate))
    }
    return days;
}

// gets the cities for the API
export function getCities() {
    return DistrictCityData
        .towns
        .map(town => town.townName);
}

// parses the static JSON object that contains the general information for the district towns and returns the state object
// cities and dates are as object keys for easier use of the data
export function getTownsStateObject() {

    let dates = getDates(NUMBER_OF_DAYS).reduce((acc, currentValue) => (acc[currentValue] = null, acc), {});
    let towns = getCities();

    return towns.reduce((acc, currentValue) => (acc[currentValue] = dates, acc), {});
}

// maps the data returned from the API to the state for today data
export function getCurrentWeatherDetails(townData) {
    return {
        currentTempC: townData.current_condition[0].temp_C,
        currentFeelTempC: townData.current_condition[0].FeelsLikeC,
        mintempC: parseInt(townData.weather[0].mintempC),
        maxtempC: parseInt(townData.weather[0].maxtempC),
        windspeedKmph: townData.current_condition[0].windspeedKmph,
        chanceofrain: townData.weather[0].hourly[0].chanceofrain,
        humidity: townData.current_condition[0].humidity,
        visibility: townData.current_condition[0].visibility,
        visibilityMiles: townData.current_condition[0].visibilityMiles,
        cloudcover: townData.current_condition[0].cloudcover,
        pressure: townData.current_condition[0].pressure,
        uvIndex: townData.weather[0].uvIndex,
        weatherIcon: townData.weather[0].hourly[0].weatherIconUrl[0].value
    }
}
// maps the data returned from the API to the state for forecast data 
export function getForecastDetails(townData) {
    return {
        currentTempC: null,
        currentFeelTempC: null,
        mintempC: parseInt(townData.weather[0].mintempC),
        maxtempC: parseInt(townData.weather[0].maxtempC),
        windspeedKmph: townData.weather[0].hourly[0].windspeedKmph,
        chanceofrain: townData.weather[0].hourly[0].chanceofrain,
        humidity: townData.weather[0].hourly[0].humidity,
        visibility: townData.weather[0].hourly[0].visibility,
        visibilityMiles: townData.weather[0].hourly[0].visibilityMiles,
        cloudcover: townData.weather[0].hourly[0].cloudcover,
        pressure: townData.weather[0].hourly[0].pressure,
        uvIndex: townData.weather[0].uvIndex,
        weatherIcon: townData.weather[0].hourly[0].weatherIconUrl[0].value
    }
}

export default getCurrentDate;