import React, { useState } from 'react';

function Country({ country }) {
  const [ shown, setShown ] = useState(false)

  return (
      <p>
        <span>{country.name}</span> <button type="button" onClick={() => setShown(!shown)}>{shown ? 'hide' : 'show'}</button>
        {shown &&
          <>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
              {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag" height="100" style={{border: "solid 1px"}} />
          </>
        }
      </p>
  )
}

export default Country