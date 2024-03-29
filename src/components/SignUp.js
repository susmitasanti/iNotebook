import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Forms.css"

function SignUp(props) {

  const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword:"" })
  let navigate = useNavigate()

  const handleSubmit = async (event) => {

    if(cred.password===cred.cpassword){

    event.preventDefault();
    const url = "http://localhost:5000/api/auth/createUser";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      navigate('/login')
      props.showAlert("success", "Account created successfully")
    }
    else{
      props.showAlert("danger", json.error)
    }
  }
  else{
    props.showAlert("danger", "Please Recheck Password")
    // alert("Please recheck password.")
  }
}

  const onChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value })
  }
  return (
    <div className="form-container">
      <div className="auth-form">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={cred.name} onChange={onChange} aria-describedby="emailHelp" required/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={cred.email} onChange={onChange} aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={cred.password} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={cred.cpassword} onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn-auth">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
