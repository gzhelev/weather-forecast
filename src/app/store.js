import {configureStore} from '@reduxjs/toolkit';
import mapReducer from '../features/mapSlice';

export default configureStore({
    reducer: {
        map: mapReducer
    }
});
