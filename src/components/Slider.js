import React from 'react';
import {getDates} from '../features/Utils'
import {useSelector, useDispatch} from 'react-redux';
import {fetchData, handleSliderChange} from '../features/mapSlice'
import {NUMBER_OF_DAYS} from '../resources/static'

function Slider() {
    const sliderValue = useSelector(state => state.map.sliderValue);
    const dispatch = useDispatch();
    
    let dates = getDates(NUMBER_OF_DAYS);

    return (
        <div className="slidecontainer">
            <input
                disabled={false}
                type="range"
                min="1"
                max={NUMBER_OF_DAYS}
                value={sliderValue}
                className="slider"
                id="myRange"
                onChange={(evnt) => {
                    // the handle slider change action waits for the async thunk to load the newly requested data.
                    let val = evnt.target.value;
                    dispatch(fetchData(dates[val-1])).then(()=>{
                        dispatch(handleSliderChange(val)); // only when the data is received we can proceed with rendering the new data for the map and additional dialog
                    });
                
            }}/>
            <div className="ticks">
                {dates.map((date,i) => <span key={i} className="tick">{date}</span>)}
            </div>
        </div>
    )
}

export default Slider;