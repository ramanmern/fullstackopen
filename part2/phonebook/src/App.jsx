import { useState, useEffect } from 'react'

import './index.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
      
      if (confirmed) {
        const changedPerson = persons.find(p => p.name === personObject.name)
        personService.update(changedPerson.id, personObject).then(returnedPerson => {
          const filteredPersons = persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
          setPersons(filteredPersons)
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedPerson.name}'s number is changed`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${returnedPerson.name} is added`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
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
      personService.remove(id).then(setPersons(persons.filter(p => p.id !== id))).catch(error => {
        setError(`Information of ${personToDelete.name} not exists`)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
      
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} error={error} />
      <Filter filtered={filtered} handleFiltered={handleFiltered}/>

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App