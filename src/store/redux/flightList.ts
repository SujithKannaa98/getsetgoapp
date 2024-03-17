import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const FlightListHandler = createAsyncThunk('gets/flightList', async (data, thunkAPI) => {
  try {
    return await axios.get('https://api.npoint.io/378e02e8e732bb1ac55b').then(response => {
      return response.data;
    })
  }
  catch (error) {
    console.log("Flight redux.......", error);
  }
})

export const FlightListSlice = createSlice({
  name: 'FlightList',
  initialState: {
    data: null,
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FlightListHandler.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  },
})
export default FlightListSlice.reducer;