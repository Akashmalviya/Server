const express = require('express')
const bodyParsar = require('body-parser')

const mongoose = require('mongoose')


const url = "mongodb://localhost:27017/auth";
const bodyparsar = require('body-parser')

const api = require('./routes/api')

const port = process.env.PORT || 3000

const app = express()

// Configuring the database
const dbConfig = require('./config/database.config.js');
//console.log("dbConfig--------->", dbConfig.url)
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(() => {
   console.log("Successfully connected to the database");    
}).catch(err => {
   console.log('Could not connect to the database. Exiting now...', err);
   process.exit();
});
mongoose.set('useFindAndModify', false );


app.use(express.urlencoded({ extended: false }));

app.use(bodyParsar.json())

app.use('/api', api)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('hello from server')
})



app.listen(port, () => {
    console.log('server is running on port ' + port);

})