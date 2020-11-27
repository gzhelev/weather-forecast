import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import getCurrentDate from '../features/Utils';
import {resetSelectedTown} from '../features/mapSlice'
import DistrictCityData from '../resources/DistrictCityData.json'

function DetailedWeather() {

    const selectedTown = useSelector(state => state.map.selectedTown);
    const dispatch = useDispatch();

    const selectedDate = useSelector(state => state.map.selectedDate);
    const isCurrentDay = getCurrentDate() === selectedDate;
    const selectedTownData = useSelector(state => state.map.townsData[selectedTown][selectedDate]);
    const townNameToDisplay = DistrictCityData
        .towns
        .find(town => town.townName === selectedTown)
        .titleToDisplay;

    // when showing detailed information for on of the next days we cannot display accurate temperature and feel like
    let currentDateInfo = '';
    if (isCurrentDay) {
        currentDateInfo = `${selectedTownData.currentTempC}℃ (Усеща се ${selectedTownData.currentFeelTempC}℃)`;
    }

    return (

        <div className="detailedWeather">
            <div>Допълнителна Информация<button
                className="close"
                onClick={() => {
            dispatch(resetSelectedTown())
        }}>X</button>
            </div>
            <div>
                {townNameToDisplay} {currentDateInfo}
            </div>

            <div>
                Вероятност за валежи: {selectedTownData.chanceofrain}%
            </div>
            <div>
                Облачност: {selectedTownData.cloudcover}%
            </div>

            <div>
                Влажност на въздуха: {selectedTownData.humidity}
            </div>
            <div>
                Максимална температура: {selectedTownData.maxtempC}&#8451;
            </div>
            <div>
                Минимална температура: {selectedTownData.mintempC}&#8451;
            </div>
            <div>
                Атмосферно налягане: {selectedTownData.pressure}hPa
            </div>
            <div>
                UV индекс: {selectedTownData.uvIndex}
            </div>
            <div>
                Скорост на вятъра: {selectedTownData.windspeedKmph}
                км/ч
            </div>
        </div>
    )

}

export default DetailedWeather;