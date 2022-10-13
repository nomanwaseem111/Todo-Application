import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Update = () => {

  const [id , setId] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate();


  const handlerUpdate = (e) => {
  
     e.preventDefault()

    axios.put( `http://localhost:5002/update/${id}`, {
      name,
      email
    })
      .then(function (response) {
        navigate("/read");

      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });

  }


  useEffect(() => {
      setName(localStorage.getItem("name"))
      setEmail(localStorage.getItem("email"))
      setId(localStorage.getItem("id"))
  },[])


  return (
    <div>
      <div className='d-flex justify-content-between px-4 mt-3'>
        <h1> Update Form </h1>
        <Link to='./read'>
        <Button variant="primary" type="submit">
          Show Data
        </Button>
        </Link>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Name </Form.Label>
          <Form.Control type="text"  required placeholder="Enter your Name" value={name}   onChange={(e) => {
            setName(e.target.value)
          }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" required placeholder="xxxxx@gmail.com" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handlerUpdate}>
          Update
        </Button>
      </Form>
    </div>
  );
}






export default Update