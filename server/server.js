const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    

    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'faceidbd'
    }

    //connection: process.env.POSTGRES_URI     -- for Docker

    /*
    {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'faceidbd'

      host : process.env.POSTGRES_HOST,
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB
    }*/
});

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') });
app.post('/signin', signin.handleSignin(bcrypt, db) );
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.post('/profile/:id', (req, res) => { profile.handleProfileUpdate(req, res, db) });
app.post('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3001, () =>{
    console.log('app is running on port ${process.env.PORT}');
});