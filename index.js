const express = require('express');
const bodyParser = require('body-parser');

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
app.post('/', (req, res) => {
    console.log(req.body);
    //get access to email, password, and password confirmation
    
    res.send('Account created!!!')
});
//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});