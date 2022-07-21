const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')

const router = express.Router();


router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
})



//Listen to post
router.post('/signup', async (req, res) => {
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


router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
})

router.get('/signin', (req, res) => {
    res.send(signinTemplate())
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email })

    if(!user) {
       return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );
    if(!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!!');
});

module.exports = router;