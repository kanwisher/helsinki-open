import React from 'react'

const Note = ({ note: { id, content, important }, toggleImportance }) => {
  const label = important ? "set not important" : "set important";
  return (
    <li>
        {content}
        <button onClick={() => toggleImportance(id)}>{label}</button>
    </li>
  )
}

export default Note