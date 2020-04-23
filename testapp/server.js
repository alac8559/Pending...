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
var pgp = require('pg-promise')()
const methodOverride = require('method-override')
const dbConfig = process.env.DATABASE_URL
var db = pgp(dbConfig)

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
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static("public"))

app.get('/home', checkAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname+'/public/Homepage.html'))
})

app.get('/login', checkNotAuthenticated, (req,res) =>{
    res.render('login.ejs')
})

app.get('/translate', checkAuthenticated, (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/translateMe.html'))
})

app.get('/tutorial', checkAuthenticated, (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/tutorial.html'))
})

app.get('/training', checkAuthenticated, (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/training.html'))
})

app.get('/', checkNotAuthenticated, (req,res) =>{
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req,res) =>{
    res.render('register.ejs')
})

app.get('/account', checkAuthenticated ,(req,res) =>{
    res.render('account.ejs', { name: req.user.name, password: req.user.name, email: req.user.email, lessonsPassed: req.user.lessonsPassed})
})

app.post('/register', checkNotAuthenticated, async (req,res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.passwordFirst, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.fullName,
            email: req.body.emailAddress,
            password: hashedPassword,
            lessonsPassed: 0
        })

//        db.query('INSERT INTO credentials(id, name, email, password) VALUES(${id}, $<name>, $/email/, $/password/)', {
//            id: Date.now().toString(),
//            name: req.body.fullName,
//            email: req.body.emailAddress,
//            password: hashedPassword
//        });


        res.redirect("/login")

    }catch{
        res.redirect("/register")
    }
    console.log(users)
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/home')
    }
    next()

}

app.listen(process.env.PORT)
