import React from 'react'

const Person = ({person: { name, phone }}) => {

  return (
    <li>{name} {phone}</li>
  )
}

export default Person