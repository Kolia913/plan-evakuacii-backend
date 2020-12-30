const app = require('express')()
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

require('dotenv').config()

const PORT = process.env.PORT || 3000

const { createSuperUser } = require('./services/superuser')

const orderRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')

mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => {
    console.log('Successfully connected to db');
    createSuperUser()
})

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan("short"))

app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
    console.log('Server is started on port: ', PORT);
})
