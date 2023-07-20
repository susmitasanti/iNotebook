import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
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
            navigate("/")
        }
        else {
            alert("Please Enter Valid Credentials.")
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })

    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login
