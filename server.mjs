import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5002

const userSchema = new mongoose.Schema({
    name: {type : String , required:true},
    email:{type: String , required:true}
  });

  const userModel = mongoose.model('user', userSchema);



app.post('/create', async (req, res) => {
  
    let body = req.body

    if(!body.name || !body.email){

        res.status(401).send({message : "Required Field Missing"})
        return;
    }

    let response = await userModel.create({

       name:body.name,
       email:body.email.toLowerCase()
     }).catch(error => {
         
        console.log("db error :", error);
        res.status(500).send({message: "db error in saving data in database"})
        return;
     })

     console.log("response :", response);
     res.status(201).send({message: "Data Saved in database"})
})


app.get('/read', async (req, res) => {
    

    let response = await userModel.find({}).exec()
    .catch(e => {
        console.log("db error :" , e);
        res.status(500).send({message : "db error in getting data"})
        return;
    })

      console.log("response :", response);
      res.status(201).send({message: response});
      return;
})

  
  app.put('/update/:id', async (req, res) => {
    
    let _id = req.params.id

    let body = {
      name : req.body.name, email:req.body.email
    }

    let response = await userModel.findByIdAndUpdate(_id , body )
    .catch(e => {
       console.log("db error :" , e);
       res.status(500).send({message: " db error in updating data"})
       return
    })

    console.log(" Updated Data : ", response);
    res.status(200).send({message: " Data is Updated"})
    return;

  })

  
  app.delete('/delete/:id', async (req, res) => {
    
     let _id = req.params.id

     let response = await userModel.findByIdAndDelete(_id)
     .catch(e => {
        console.log("db error :" , e);
        res.status(500).send({message: " db error in deleting data"})
        return
     })

     console.log("Data Deleted : ", response);
     res.status(200).send({message: "Data Deleted in Database"})
     return;
      
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbURI = "mongodb+srv://abc:abc@cluster0.mqvorxn.mongodb.net/newTodoApp?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
