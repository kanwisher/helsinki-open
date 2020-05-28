import React from 'react'

const Note = ({ note: { content }}) => (
  <li>
      {content}
  </li>
)

export default Note