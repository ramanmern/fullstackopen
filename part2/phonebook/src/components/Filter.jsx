const Filter = ({filtered, handleFiltered}) => {
    return (
        <input type="text" value={filtered} onChange={handleFiltered}/>
    )
}

export default Filter