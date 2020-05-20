import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, click}) => (
  <button
  onClick = {click}
  >
    {text}
  </button>
)

const average = ({ good, bad }, total) => {
  return (good - bad) / total
}

const calcTotal = ({ good, neutral, bad }) => {
  return good + neutral + bad
}

const percentPositive = ({ good }, total) => {
  return `${(good / total) * 100}%`
}

const Statistic = ({ text, value }) => (
  <tr>
   <th>{text}</th>
   <td>{value}</td>
  </tr>
)

const Statistics = ({stats, totalCount}) => {
  const {
    good,
    neutral,
    bad
  } = stats
  
  return (
    totalCount ?
    <table>
      <tbody>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"all"} value={totalCount} />
        <Statistic text={"average"} value={average(stats, totalCount)} />
        <Statistic text={"positive"} value={percentPositive(stats, totalCount)} />
      </tbody>
    </table>
    :
    <p>No feedback Given</p>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    good,
    neutral,
    bad
  }

  const incrementState = (state, fn, amount) => {
    return () => {
      fn(state + amount);
    }
  };

  const incrementGood = incrementState(good, setGood, 1);
  const incrementNeutral = incrementState(neutral, setNeutral, 1);
  const incrementBad = incrementState(bad, setBad, 1);
  const totalCount = calcTotal(stats);

  return (
    <>
      <h2>give feedback</h2>
      <Button click={incrementGood} text={"good"} />
      <Button click={incrementNeutral} text={"neutral"} />
      <Button click={incrementBad} text={"bad"} />
      <h2>statistics</h2>
      <Statistics stats={stats} totalCount={totalCount} />

    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)