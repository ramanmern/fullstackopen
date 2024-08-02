import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  
  const handleAddPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    } 

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFiltered = (e) => {
    setFiltered(e.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filtered={filtered} handleFiltered={handleFiltered}/>

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App