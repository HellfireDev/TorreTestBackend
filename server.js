const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { db } = require('./model/dbConnection');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');


const app = express();
//Middleware
app.use(express.json());
app.use(cors());

//Default app verification
app.get('/', (req, res) => { res.json('It is working') });

//Manage user access
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

//Get user bio
// const torreUserId = 'jaimedtorres';
// const searchSize = 5;
// const experienceLevel = 'potential-to-develop';


// fetch(`https://bio.torre.co/api/bios/${torreUserId}`)
//     .then(response => response.json())
//     .then(bio => {
//         fetch(`https://search.torre.co/opportunities/_search?size=${searchSize}&aggregate=false`, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "skill/role": {
//                     text: `${bio.interests[0].name}`,
//                     experience: `${experienceLevel}`
//                 }
//             })
//         }).then(response => response.json())
//             .then(console.log)

//     })

app.listen(process.env.PORT || 3010, () => console.log(`App is running on port ${process.env.PORT || 3010}`));