const Note = ({note, toggleImportance}) => {
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{note.important ? 'Make not important' : 'Make important'}</button>
        </li>
    )
}

export default Note