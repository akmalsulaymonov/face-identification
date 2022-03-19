const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('working....');
});

app.listen(3001, () =>{
    console.log('app is ready');
});


/*

/ - root
/signin - POST success/fail
/register - POST user
/profile/:uderID - GET user by ID
/iamge - PUT update user image

*/