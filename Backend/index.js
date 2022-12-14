const express=require('express')
const app = express()
const port=5000;
const mongoose=require('mongoose');
app.use(express.json());
var cors = require('cors')



mongoose.connect('mongodb://127.0.0.1:27017/iNotebook',()=>{
    console.log("Connected to MongoDB iNotebook Database");

})
const auth=require('./routers/auth')
const notes=require('./routers/notes')


app.use(cors())
app.use('/api/auth',auth)
app.use('/api/notes',notes)

app.listen(port,()=>{
    console.log("app listening on port " + port)
})