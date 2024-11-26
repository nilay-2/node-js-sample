var express = require('express')
const { Sequelize } = require('sequelize');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

const database = process.env.DB
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.host

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch (error => {
    console.error('Unable to connect to the database:', error);
  })


app.get('/', function(request, response) {
  response.send('Hello World!')
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
