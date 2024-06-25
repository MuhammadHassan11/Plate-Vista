const express = require('express');
var mysql = require('mysql2');
var cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3210;

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'Put',
      'Delete',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

app.use(express.json());
app.get('' , (req , res)=>{
    const params = req.params;
    res.status(200).send({
        message : "200 ", params
        
    })
})
// app.get('/user/:id' , (req , res)=>{
//     res.status(200).send({
//         status : "User with Id " + req.params.id
//     })
// })
app.post('' , (req , res)=>{
    res.status(200).send({
        status : "200 ",
        data : req.body
    })
})
// app.post('/user/' , (req , res)=>{
//     res.status(200).send({
//         status : "User Created ",
//         data : req.body
//     })
// })
app.put('' , (req , res)=>{
    res.status(200).send({
        
        status : "200"

    })
})

// app.put('/user/:id' , (req , res)=>{
//     res.status(200).send({
//         status : "User updated with Id :" + req.params.id
//     })
//})
app.delete('' , (req , res)=>{
    res.status(200).send({
        status : "200" + req.params
    })
})
// 
app.listen(PORT , () => {
     console.log("server is running at port 3210");
})