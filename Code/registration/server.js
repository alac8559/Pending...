const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) =>{
    res.render('index.ejs', {name: 'Kyle'})
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



app.listen(3000)