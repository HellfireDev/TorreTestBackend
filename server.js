const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { db } = require('./model/dbConnection');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfile } = require('./controllers/profile');
const { handleCombo } = require('./controllers/combo');


const app = express();
//Middleware
app.use(express.json());
app.use(cors());

//Default app verification
app.get('/', (req, res) => { res.json('It is working') });

//Manage user access
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

//App services
app.post('/profile', (req, res) => { handleProfile(req, res) });  //Returns 3 random strengths, interests and experiences for logged user
app.post('/combo', (req, res) => { handleCombo(req, res) }); //Returns 3 random job opportunities and 3 torre user profiles based on request data (jobs and mentors)

//Start server
app.listen(process.env.PORT || 3010, () => console.log(`App is running on port ${process.env.PORT || 3010}`));