import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  const handleAddPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())) {
      const confirmed = window.confirm(`${personObject.name} is already added to phonebook. Do you want to replace old number?`)
      console.log(confirmed);
      
      if (confirmed) {
        const changedPerson = persons.find(p => p.name === personObject.name)
        personService.update(changedPerson.id, personObject).then(returnedPerson => {
          const filteredPersons = persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
          setPersons(filteredPersons)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
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

  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    const confirmed = window.confirm(`Do you really want to delete ${personToDelete.name}?`)
    if (confirmed) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filtered={filtered} handleFiltered={handleFiltered}/>

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App