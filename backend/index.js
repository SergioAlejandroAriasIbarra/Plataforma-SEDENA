const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');


app.listen(process.env.PORT || 3000, () => console.log("Listen on port 3000"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/main', require('./routes/user.routes'))


//./routes/user.routes

