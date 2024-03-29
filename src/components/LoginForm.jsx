import PropTypes from 'prop-types'

const LoginForm = props => {
    const {
        handleLogin,
        username,
        handleUsernameChange,
        password,
        handlePasswordChange,
    } = props

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
      </div>
    );
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}


export default LoginForm