const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const route = require('./route/route');
const userRouter = require('./route/userRouter')
const mongoose = require('mongoose');
const app = express();
let URI = "mongodb+srv://aniketflyweis:Flyweis@student.8yymmsy.mongodb.net/Amit-E-wallet?authSource=admin&replicaSet=atlas-v1orbd-shard-0&readPreference=primary&appname=E-wallet%20Compass&ssl=true"
const PORT = 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(URI, {
    useNewUrlParser: true 
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.use('/api/user',userRouter)

app.listen(process.env.PORT || PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT || PORT))
})