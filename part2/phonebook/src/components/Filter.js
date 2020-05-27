import React from 'react'

const Filter = ({ filter, setFilter }) => {

  return (
    <div>
        Filter by name: <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

export default Filter