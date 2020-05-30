import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'




function App() {
  const [ countries, setCountries ] = useState([])
  const [ filterQuery, setFilterQuery ] = useState('')
  // get countries
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountries(data))
  }, []);

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filterQuery.toLowerCase()))

  const renderCountries = (countries) => {
    if (countries.length === 1) {
      const country = countries[0];
      return (
        <>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt="flag" height="100" style={{border: "solid 1px"}} />
        </>
      )
    } else if (countries.length <= 10) {
      return (
        <ul>
            {countries.map((country) => <li key={country.name}>{country.name}</li>)}
        </ul>
      )
    } else {
      return <p>Too many matches, specify another filter</p> 
    }
  }

  return (
    <>
      <form>
        <input type="text" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
      </form>
      <div className="App">
        {renderCountries(filteredCountries)}
      </div>
    </>
  );
}

export default App;
