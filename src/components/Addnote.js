import React from 'react'
import Addnote1 from './Addnote1'


import Login from './Login';
const Addnote = () => {
  
  return (
    <div>
      {localStorage.getItem('token')?<Addnote1/>:<Login/>}
    </div>
  )
}

export default Addnote
