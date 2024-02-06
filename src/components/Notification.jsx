const Notification = ({ notice }) => { 
    if (notice === null) {
        return null;
    }

    const { message, isError } = notice;

    return (
        <div id="message" className={isError ? 'error' : 'success'}>
            {message}
        </div>
    );
}


export default Notification;