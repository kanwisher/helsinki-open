import React from 'react'

const Person = ({person: { id, name, phone }, deleteClicked }) => {
  return (
    <>
      <li>{name} {phone}</li>
      <button onClick={() => deleteClicked(id)}>delete</button>
    </>
  )
}

export default Person