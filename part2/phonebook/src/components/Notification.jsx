const Notification = ({message, error}) => {
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
            </div>
        )
    }
    
    if (!message) {
        return null
    }

    return (
        <div className="message">
            <p>{message}</p>
        </div>
    )
}

export default Notification