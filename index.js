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

  // Define a route to fetch data from the "nilay-images" table
app.get('/getProducts', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM `products`');
    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data from products table',
    });
  }
});

app.post('insert-data', async (req, res) => {
  try {
    const {productName} = req.query;
    const [results] = await sequelize.query(`INSERT INTO products (name) VALUES ('${productName}')`);
    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data from products table',
    });
  }
})

app.get('/', function(request, response) {
  response.send('Hello World!')
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
  console.log(`ENV: DB: ${database} | user: ${username} | pass: ${password} | host: ${host}`)

})
