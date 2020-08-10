import React from 'react'

const Person = ({person: { id, name, number }, deleteClicked }) => {
  return (
    <>
      <li>{name} {number}</li>
      <button onClick={() => deleteClicked(id)}>delete</button>
    </>
  )
}

export default Person