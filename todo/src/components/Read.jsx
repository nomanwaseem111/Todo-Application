import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from "react-router-dom";


const Read = () => {

    const [data, setData] = useState([])

    const getData = () => {


        axios.get('http://localhost:5002/read')
            .then(function (response) {
                // handle success
                setData(response.data.message);
                //   console.log(response.data);
                console.log(data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    }



    const handlerDelete = (id) => {


        axios.delete(`http://localhost:5002/delete/${id}`)
            .then(function (response) {
                // handle success
             getData()

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

    useEffect(() => { getData() }, [])


    const setToLocalStorage = (name,email,id) => {

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("id", id)

    }



    return (
        <div>
           <div className='d-flex justify-content-between px-4 mt-3'>
        <h1> Read Operation </h1>
        <Link to='/'>
        <Button variant="secondary" type="submit">
          Back
        </Button>
        </Link>
      </div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th> Name</th>
                        <th> Email </th>
                    </tr>

                </thead>


                {
                    data.map((eachData, index) => {
                        return (
                            <tbody key={index}>
                                <tr className="text-center">
                                   <td>{eachData.name}</td>
                                    <td>{eachData.email}</td>
                                    <td> 
                                    <Link to='/update'>
                                    <Button variant="success" onClick={() => setToLocalStorage(eachData.name,eachData.email, eachData._id)}>Edit</Button>   
                                    </Link>
                                    
                                    <Button variant="danger" onClick={() => { handlerDelete(eachData._id) }}>Delete</Button></td>

                                </tr>

                            </tbody>
                        )
                    })
                }


            </Table>



        </div>
    )
}

export default Read