const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const { rmSync } = require('fs');
const users = require('./repositories/users');


//what kind of request it shoudl receive and what it shoud do
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['lkasld235j']
}));
app.use(authRouter);



//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});