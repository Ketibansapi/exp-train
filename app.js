const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const app = express()
const logger = require('./lib/logger')
const { checkAuth, checkRole } = require('./lib/checkAuth')
require('dotenv').config()

/**
 * Middlewares
 * cors, helmet, body-parser, cookie-parser, compression, morgan
 */
app.use(helmet())
app.use(cors({
    origin: ['localhost:8080', 'http://somewebsite.com'],
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SECRET))
app.use(morgan('combined'))
app.use(compression())

/**
 * Import router
 */
const helloRoute = require('./routes/hello.route')()
const userRoute = require('./routes/user.route')()
const authRoute = require('./routes/auth.route')()
app.use('/hello', helloRoute)
app.use('/user', userRoute)
app.use('/auth', authRoute)

app.get('/cookie', (req, res) => {
    res.cookie('apa-apa', 'value', {
        maxAge: 10000, //expiry
        httpOnly: true,
        secure: true
    }) //set cookies

    req.cookies['apa-apa'] //get cookies
    req.cookies.apa //get cookies

    res.status(200).json({
        status: "OK",
        name: req.cookies.name
    })
})

/**
 * 404
 */
app.all('/', logger, checkAuth, (request, response) => {
    response.status(404).json({
        status: "OK"
    })
})

app.listen(3000, (err) => {
    if(err) console.error(err)
    else console.log("Server start at :3000")
})

// Mongodb
// nodetrainer
// ng9RWzHMqszEtM15