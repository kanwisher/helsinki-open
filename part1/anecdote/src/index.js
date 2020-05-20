import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function randomNum(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const random = (anecdotes, fn) => {
  return () => {
    const max = anecdotes.length - 1;
    const newSelected = randomNum(0, max);
    fn(newSelected);
  }
}

const voteSelected = (points, idx, fn) => {
  return () => {
    const copy = [...points];
    const currVotes = copy[idx];
    copy[idx] = currVotes + 1;
    fn(copy);
  }
}

const mostVotes = (anecdotes, points) => {
  const maxNum = Math.max(...points);
  const idx = points.indexOf(maxNum);

  return anecdotes[idx];
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(props.points);
  const vote = voteSelected(points, selected, setPoints);
  const randomSelected = random(anecdotes, setSelected);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={vote}>Vote</button>
      </div>
      <button onClick={randomSelected}>Random anecdote</button>
      <h1>Anecdote with the most votes</h1>
      {mostVotes(props.anecdotes, points)}
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = anecdotes.map(() => 0);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)