const express = require('express');
const app = express();
const dotenv = require('dotenv');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();


app.get("/", (req,res)=>{
    res.send("Up and running");
});



//Calling Local Routes
const authRoute = require('./routes/authentication');


//Using Routes
app.use("/users/",authRoute);



app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log('Server listening on port 3000');
});