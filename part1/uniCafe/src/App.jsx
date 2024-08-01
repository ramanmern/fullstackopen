import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={'Good'} value={good} />
          <StatisticLine text={'Neutral'} value={neutral} />
          <StatisticLine text={'Bad'} value={bad} />
          <StatisticLine text={'Total'} value={total} />
          <StatisticLine text={'Average'} value={average} />
          <StatisticLine text={'Positive'} value={positive} />
        </tbody>
      </table>
      
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1) 

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={handleGood} text={'Good'} />
      <Button onClick={handleNeutral} text={'Neutral'} />
      <Button onClick={handleBad} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App