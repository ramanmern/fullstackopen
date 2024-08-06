import Country from "./Country"

const Results = ({countries}) => {

    if (countries.length > 10) {
        return <p>Too many matches, specify another fiter</p>
    }

    if (countries.length > 1) {
        return (
            <ul>
                {countries.map(c => <Country key={c.name.common} country={c} />)}
            </ul>
        )
    }

    if (countries.length === 1) {
        return (
            <div>
                <h2>{countries[0].name.common}</h2>
                <p>Capital: {countries[0].capital[0]}</p>
                <p>Area: {countries[0].area}</p>
                <p>Languages:</p>
                <ul>
                    {Object.values(countries[0].languages).map(l => <li key={l}>{l}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt="Country flag" />
            </div>
        )
    }
}

export default Results