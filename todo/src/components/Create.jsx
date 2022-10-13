import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Create = () => {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const submitHandler = (e) => {

    e.preventDefault()



    axios.post('http://localhost:5002/create', {
      name,
      email
    })
      .then(function (response) {
        console.log(response.data);
        navigate('/read');
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });

  }



  return (
    <div>
      <div className='d-flex justify-content-between px-4 mt-3'>
        <h1> Create Form </h1>
        <Link to='./read'>
        <Button variant="primary" type="submit">
          Show Data
        </Button>
        </Link>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Name </Form.Label>
          <Form.Control type="text"  required placeholder="Enter your Name" onChange={(e) => {
            setName(e.target.value)
          }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" required placeholder="xxxxx@gmail.com" onChange={(e) => {
            setEmail(e.target.value)
          }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}






export default Create