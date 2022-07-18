const express = require('express');
const bodyParser = require('body-parser');
const { is } = require('express/lib/request');
const usersRepo = require('./repositories/users');

//what kind of request it shoudl receive and what it shoud do
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>`);
})



//Listen to post
app.post('/', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body
    //get access to email, password, and password confirmation
    const existingUser = await usersRepo.getOneBy({email})
    if (existingUser) {
        res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }
    
    res.send('Account created!!!')
});
//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});