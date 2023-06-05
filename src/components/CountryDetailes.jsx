import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

function CountryDetails() {
  const activeCountry = useSelector((state) => state.countries.activeCountry);
  const country = useSelector((state) => state.countries.countries?.find((c) => c.cca3 === activeCountry));
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${activeCountry}`);
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    if (activeCountry) {
      fetchCountryData();
    }
  }, [activeCountry]);

  if (!activeCountry || !countryData) {
    return <div className="no-country-selected">No country selected.</div>;
  }

  let currencyName = 'n/a';
  if (countryData[0] && countryData[0].currencies) {
    const { currencies } = countryData[0];
    const currencyKeys = Object.keys(currencies);
    if (currencyKeys.length > 0) {
      currencyName = currencies[currencyKeys[0]].name;
    }
  }

  const formatNumber = (number) => number.toLocaleString();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <Typography variant="h3" component="div">Detailed info:</Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <img
              src={country.flags.png}
              alt={country.name.common}
            />
            <Typography variant="h2" component="h2">{country.name.official}</Typography>
            <Typography variant="p" component="p">
              Capital:
              {' '}
              {countryData[0].capital}
            </Typography>
            <Typography variant="p" component="p">
              Region:
              {' '}
              {countryData[0].region}
            </Typography>
            <Typography variant="p" component="p">
              Area, km^2:
              {' '}
              {formatNumber(countryData[0].area)}
            </Typography>
            <Typography variant="p" component="p">
              Population:
              {' '}
              {formatNumber(countryData[0].population)}
            </Typography>
            <Typography variant="p" component="p">
              Currencies:
              {' '}
              {currencyName}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CountryDetails;
