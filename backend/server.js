const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Azizjon',
            email: 'azizjon@gravity.studio',
            password: '123456',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Mehrona',
            email: 'mehrona@gravity.studio',
            password: '123456',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }
    else{
        res.status(400).json('error loggin in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });

    res.json(database.users[database.users.length - 1]);
});

app.listen(3001, () =>{
    console.log('app is running on port 3001');
});


/*

/ - root
/signin - POST success/fail
/register - POST user
/profile/:uderID - GET user by ID
/iamge - PUT update user image

*/