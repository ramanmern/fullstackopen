import Person from "./Person"

const Persons = ({filteredPersons, onDelete}) => {
    return (
        <>
            {filteredPersons.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
        </>
    )
}

export default Persons