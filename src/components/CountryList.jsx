import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { fetchCountries, setActiveCountry } from '../redux/countriesSlice';
import CountryDetails from './CountryDetailes';

function CountryList() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const activeCountry = useSelector((state) => state.countries.activeCountry);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const paginate = (array, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  const paginatedCountries = paginate(countries, currentPage);
  const getTotalPages = () => Math.ceil(countries.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryClick = (country) => {
    dispatch(setActiveCountry(country.cca3));
  };

  return (
    <Grid container spacing={2}>
      <div className="country-list">
        <Stack spacing={2}>
          <Pagination
            count={getTotalPages()}
            shape="rounded"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
        <ul>
          {paginatedCountries.map((country) => (
            <li
              key={country.cca3}
              onClick={() => handleCountryClick(country)}
              className={`country-item ${activeCountry === country.cca3 ? 'active' : ''}`}
            >
              <img src={country.flags.png} alt={country.name.common} style={{ width: '80%', maxWidth: '80px' }} />
              <Typography variant="p" component="p">
                <span>{country.name.common}</span>
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className="country-details">
        {activeCountry ? (
          <CountryDetails />
        ) : (
          <div className="no-country-selected">No country selected.</div>
        )}
      </div>
    </Grid>
  );
}

export default CountryList;
