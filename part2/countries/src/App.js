import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Country from './components/Country'

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
        countries.map((country) => <Country key={country.name} country={country}/>)
      )
    } else {
      return <p>Too many matches, specify another filter</p> 
    }
  }

  return (
    <>
      <form>
        <label>
          Find Countries
          <input type="text" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
        </label>
      </form>
      <div className="App">
        {renderCountries(filteredCountries)}
      </div>
    </>
  );
}

export default App;
