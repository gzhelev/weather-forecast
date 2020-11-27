import './App.css';
import React from 'react';
import Map from './components/Map'
import {useSelector} from 'react-redux';
import DetailedWeather from './components/DetailedWeather'

function App() {

    const selectedTown = useSelector(state => state.map.selectedTown);
    const selectedDate = useSelector(state => state.map.selectedDate)
    return (

        <div className="App">
            <div className="header">Прогноза за България за {selectedDate}</div>
            <Map/> {selectedTown && <DetailedWeather/>}

        </div>

    );
}

export default App;
