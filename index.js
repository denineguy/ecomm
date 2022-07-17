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

const bodyParser = (req, res, next) => {
    //req.on is like addEventListener.
    if(req.method = 'POST') {
        req.on('data', data => {
            console.log(data.toString('utf8'));
            const parsed = data.toString('utf8').split('&');
            const formData = {};
            for(let pair  of parsed) {
                const[key, value] = pair.split('=');
                formData[key] = value;
            }
            req.body = formData;
            next();
        })
    } else {
        next();
    }
    
}

//Listen to post
app.post('/', bodyParser, (req, res) => {
    console.log(req.body);
    //get access to email, password, and password confirmation
    
    res.send('Account created!!!')
});
//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});