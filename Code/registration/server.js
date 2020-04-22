if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
var path = require('path')

const initializePassport = require('./passport-config')
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/home', (req,res) => {
//    res.sendFile(path.join(__dirname+'/../Home/Homepage.html'))
    res.render('Home/Homepage.ejs', {fullname: req.user.name})
})

app.get('/login', (req,res) =>{
    res.render('login.ejs')

})

app.get('/register', (req,res) =>{
    res.render('register.ejs')

})

app.post('/register', async (req,res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.passwordFirst, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.fullName,
            email: req.body.emailAddress,
            password: hashedPassword
        })
        res.redirect("/login")

    }catch{
        res.redirect("/register")
    }
    console.log(users)
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.listen(3000)