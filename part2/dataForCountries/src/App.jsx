import { useState, useEffect } from "react"
import axios from 'axios'

import Results from './components/Results'

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => setData(response.data))
  }, [])

  const handleFilterChange = (e) => {
    setQuery(e.target.value)
    const filteredCountries = data.filter(c => c.name.common.toLowerCase().includes(query))
    setCountries(filteredCountries)
  }

  return(
    <div>
      <h1>Countries</h1>

      <input value={query} onChange={handleFilterChange}/>

      <Results countries={countries}/>
    </div>
  )
}

export default App