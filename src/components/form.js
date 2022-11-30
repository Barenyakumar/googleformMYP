import React from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'


export default function Form() {
  const navigate = useNavigate()
  const createForm = () => {
    const id_ = uuid()
    // console.log(id_) 
    navigate("/form/"+ id_)

  }
  return (
    <div className="App" onClick={createForm}>
      Create new
    </div>
  )
}
