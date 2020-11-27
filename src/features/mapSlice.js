import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getTownsStateObject, getCurrentDate, getCities, getDates, getForecastDetails, getCurrentWeatherDetails} from './Utils'
import {BASE_API_URL,PARAMS,API_KEY, NUMBER_OF_DAYS} from '../resources/static'

// the main async thunk that fetches the data for all cities in bulk
// the API always returns information for the current time and additional information for the date specified
export const fetchData = createAsyncThunk('posts/fetchData', async(date) => {
    const townsList = getCities().join(";");
    const response = await fetch(`${BASE_API_URL}key=${API_KEY}&q=${townsList}&${PARAMS}&date=${date}`);
    return response.json();
});

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        selectedTown: null,
        selectedDate: getCurrentDate(),
        loadingStatus: null,
        sliderValue: 1,
        townsData: getTownsStateObject()
    },
    reducers: {
        // handleSliderChange - used to set the input state that determines the date for the forecast 
        handleSliderChange: (state, action) => {
            let dates = getDates(NUMBER_OF_DAYS);
            state.sliderValue = action.payload;
            state.selectedDate = dates[action.payload - 1];
        },
        // handleTownSelect - used when clicking on a town on the map to show the additional information dialog
        handleTownSelect: (state, action) => {
            state.selectedTown = action.payload;
        },
        // resetSelectedTown - used to close the additional information dialog 
        resetSelectedTown: state => {
            state.selectedTown = null;
        }
    },
    extraReducers: {
        [fetchData.fulfilled]: (state, action) => {

            const result = action.payload.data.area;
            let currenRequesttDate = action.meta.arg;
            let today = getCurrentDate();
            // API behaviour: if Dobrich is passed for the city, the API returns "Dobrich, Bulgaria"
            // the split is needed to match the data to the state object correctly
            result.forEach(townData => {
                let currentTown = townData
                    .request[0]
                    .query
                    .split(",")[0];
                if (today === currenRequesttDate) {
                    state.townsData[currentTown][currenRequesttDate] = getCurrentWeatherDetails(townData);
                } else {
                    state.townsData[currentTown][currenRequesttDate] = getForecastDetails(townData);
                }
            });
            state.loadingStatus = 'succeeded';

        },
        [fetchData.pending]: (state) => {
            state.loadingStatus = 'loading'
        }
    }
});


export const {
    handleSliderChange,
    handleTownSelect,
    resetSelectedTown
} = mapSlice.actions;

export default mapSlice.reducer;