import React from 'react'

const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Part = ({ part: { name, exercises }}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => {
  return (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
)

const Course = ({ course: { name, parts } }) => (
  <div>
    <Header name={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
)

export default Course;