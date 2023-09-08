const express = require('express')
require("dotenv").config()
const bodyParser = require("body-parser")
const passport = require('passport')
const session = require("express-session")


const PORT = process.env.PORT || 4000
const connectDB = require('./config/db')
const apiRouter = require('./routes')
const { Admin, Patients } = require('./models')

const app = express()
connectDB()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(session({
    secret: "#@$%^0904sdjl",
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(Admin.createStrategy())
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

app.use('/api', apiRouter)


app.get('/', (req, res) => {
    res.redirect("/api/admin")

})




app.listen(PORT, () => console.log(`server was up and running on ${PORT} port`))