import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Forms.css"

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("success", "Successfully Logged In!!")
            navigate("/home")

        }
        else {
            props.showAlert("danger", json.error)
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })

    }
    return (
        <>
        <div className="form-container">
    <div className="auth-form">
        <h2 className="auth-title">Log In</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required/>
                <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} required/>
            </div>
            <button type="submit" className="btn-auth">Log In</button>
        </form>
    </div>
</div>
</>
    )
}

export default Login
