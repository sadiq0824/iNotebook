
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
function Signup(props) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name,email,password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token',json.authtoken);
       navigate('/')
       props.showAlert("Account Created Successfully","success")
    } else {
      props.showAlert("Invalid credentials","danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <h2 className='text-center'style={{color:'white'}}>Registration For <span style={{color:'red'}}>iNote</span>book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label style={{color:'white'}} htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">
              <label style={{color:'white'}} htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
              <div style={{color:'white'}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label style={{color:'white'}} htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
            </div>


            <button type="submit" className="btn btn-primary form-control">Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Signup
