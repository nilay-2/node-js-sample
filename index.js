var express = require('express')
const { Sequelize } = require('sequelize');
var app = express()

app.use(express.json())

app.use(express.static(__dirname + '/public'))
const database = process.env.DB || 'ecommerce'
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || 'root'
const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 3306

// 'mysql://root:root@localhost:3306/ecommerce'
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
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

app.post('/insert-data', async (req, res) => {
  try {
    const {productName} = req.body;
    console.log(productName);
    const [results] = await sequelize.query(`INSERT INTO products (name) VALUES ('${productName}')`);
    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to insert data from products table',
    });
  }
})

app.get('/', function(request, response) {
  response.send('Hello World!')
})


app.listen(5000 || process.env.PORT, function() {
  console.log("Node app is running at localhost:" + app.get('port'))
  console.log(`ENV: DB: ${database} | user: ${username} | pass: ${password} | host: ${host} | db port: ${port}`)

})
