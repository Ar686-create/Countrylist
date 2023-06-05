/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
  return response.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    activeCountry: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveCountry: (state, action) => {
      state.activeCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setActiveCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
