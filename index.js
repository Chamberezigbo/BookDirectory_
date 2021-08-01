require('dotenv').config();
const express = require('express');
const cors = require('cors')

require('./src/db/mongoose');
const bodyParser = require('body-parser')


const userRouter = require('./src/router/user');
const bookRouter = require('./src/router/book');
const publicUserRouter = require('./src/router/public_user')
const passwordReset = require("./src/router/passwordReset");

const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
app.use(publicUserRouter)
app.use(passwordReset)

app.listen(port, () => {
       console.log('server is up on port '+ port);
})