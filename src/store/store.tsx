import { configureStore } from "@reduxjs/toolkit";
import flightListReducer from './redux/flightList';

const store = configureStore({
    reducer: {
        FlightList: flightListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})
export default store;