const express = require('express');

//what kind of request it shoudl receive and what it shoud do
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <div>
        <form>
            <input name="email" placeholder="email"/>
            <input namee="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>`);
});

// });
//start listening for requests
app.listen(3000, () => {
    console.log('Listening')
});