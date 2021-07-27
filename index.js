require('dotenv').config();
const express = require('express');

require('./src/db/mongoose');
const bodyParser = require('body-parser')


const userRouter = require('./src/router/user');
const bookRouter = require('./src/router/book');

const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json());
app.use(userRouter);
app.use(bookRouter);

app.listen(port, () => {
       console.log('server is up on port '+ port);
})