const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json()) 
app.use(morgan("dev"))

app.use("/inventory", require("./routes/inventoryRouter.js"))

mongoose.connect('mongodb://localhost:27017/inventorydb',{useNewUrlParser: true})
.then(()=> console.log("Connected to MongoDB"))
.catch(err => console.error(err));

app.use((err, req, res, next)=> {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(8000, ()=>{
    console.log("The server is running on Port 8000")
})