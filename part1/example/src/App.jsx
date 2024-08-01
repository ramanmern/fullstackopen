import { useState } from "react"

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing buttons
      </div>
    )
  }

  return (
    <div>
      Button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRigth = right + 1
    setRight(updatedRigth)
    setTotal(left + updatedRigth)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text={'Left'} />
      <Button onClick={handleRightClick} text={'Right'} />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App