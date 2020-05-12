const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const User = require('../models/user')

const url = "mongodb://localhost:27017/auth";
const bodyparsar = require('body-parser')






router.get('/register', (req, res) =>{
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
  })
router.get('/loginSuccessfull', (req, res) => {
    res.render('donemsg.ejs')
  })

router.get('/', (req, res) => {
    res.render('welcome')
})
router.post('/registerUser', (req, res) => {
    let userData = req.body
    // console.log(req.body);
    
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        } else {
            if (user) {
                res.status(401).send({ massage: "this email is used try another" })

            } else {
                let user = new User(userData)
                user.save((err, regisetetdUser) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    } else {
                        res.redirect('login')
                    }
                })

            }
        }
    })

})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        } else {
            if (!user) {
                res.status(404).send('invalid email')

            } else {

                if (!bcrypt.compareSync(userData.password, user.password)) {
                    res.status(401).send('worng passsword')
                } else {
                    res.redirect('loginSuccessfull')
                }

            }

        }
    })
})

module.exports = router