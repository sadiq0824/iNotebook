import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
function Login(props) {
  const [credentials, setCredentials] = useState({email:'',password:''})
  let navigate= useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
        
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
       localStorage.setItem('token',json.authtoken);
       props.showAlert("Login Successfully","success")
       navigate('/notes')
    }else{
      props.showAlert("Invalid credentials","danger")
    }
  }
  const onChange=(e)=>{
       setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='container mt-3'>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
            <h1 style={{color:'white'}}>Login to continue with <span style={{color:'red'}}>iNote</span>book</h1>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" style={{color:'white'}}>Email address</label>
    <input type="email"  onChange={onChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" style={{color:'white'}} value={credentials.password} className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{color:'white'}}>Password</label>
    <input type="password" onChange={onChange} className="form-control" id="password" name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary form-control" onSubmit={handleSubmit}>Submit</button>
</form>
        </div>
      </div>
     
    </div>
  )
}

export default Login
