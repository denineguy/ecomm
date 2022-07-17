const express = require('express');

//what kind of request it shoudl receive and what it shoud do
const app = express();

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
    //get access to email, password, and password confirmation
    //req.on is like addEventListener.
    req.on('data', data => {
        console.log(data.toString('utf8'));
        const parsed = data.toString('utf8').split('&');
        const formData = {};
        for(let pair  of parsed) {
            const[key, value] = pair.split('=');
            formData[key] = value;
        }
        console.log(formData);
    })
    res.send('Account created!!!')
});
//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});