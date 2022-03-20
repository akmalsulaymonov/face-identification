const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
        res.json(database.users[0]);
    }
    else{
        res.status(400).json('error loggin in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    
    /*
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    bcrypt.compare(password, '$2a$10$urBdJFD/6/HJYg20CtsN0eM3aZaYFQpEvtVH.v/prFan5zqGrokOC', function(err, res) {
        console.log('first', res)
    });
    bcrypt.compare("veggies", '$2a$10$urBdJFD/6/HJYg20CtsN0eM3aZaYFQpEvtVH.v/prFan5zqGrokOC', function(err, res) {
        console.log('second', res)
    });
    */
    
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

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id == id){
            found = true;
            res.json(user);
        }
    })
    if(!found){
        res.status(404).json('user not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id == id){
            found = true;
            user.entries++;
            res.json(user);
        }
    })
    if(!found){
        res.status(404).json('user not found');
    }
})

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