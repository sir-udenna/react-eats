import './Login.css'

const LogIn = props => {
    return (
        <div className="container">
            <form onSubmit={props.handleLogin}>
                <label>email</label>
                <input type="text" required />
                <br />
                <label>password</label>
                <input type="password" required />
                <br />
                <input type="submit" />
            </form>
        </div>

    )
}

export default LogIn;