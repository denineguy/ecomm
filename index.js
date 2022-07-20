const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');
const { rmSync } = require('fs');


//what kind of request it shoudl receive and what it shoud do
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['lkasld235j']
}));

app.get('/signup', (req, res) => {
    res.send(`
    <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>`);
})



//Listen to post
app.post('/signup', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body
    //get access to email, password, and password confirmation
    const existingUser = await usersRepo.getOneBy({email})
    if (existingUser) {
        res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({email, password});

    console.log(user.id);
    // Store the id of that user in the users cookie
    req.session.userId === user.id; //added by cookie-session
    console.log(req.session.userId);
    
    res.send('Account created!!!');
});


app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
})

app.get('/signin', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <button>Sign In</button>
        </form>
    </div>`
    )
})

app.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email })

    if(!user) {
       return res.send('Email not found');
    }

    if(user.password !== password) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!!');
});


//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});