require('dotenv').config();
require('./utils/dbInstance');

global.express     = require('express');
const bodyParser   = require('body-parser');
const fs           = require('fs');
const path         = require('path');
const apiLimiter   = require('./middlewares/apiLimiter');
const logRequest   = require('./middlewares/logRequest');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(apiLimiter);
app.use(logRequest);


// Prefix otomatis untuk semua route
const API_PREFIX = '/api/v1';

// Autoload semua file di folder "routes"
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const route = require(path.join(routesPath, file));
    let routeName = file.replace('.js', '').replace('Routes', ''); // Misal "books.js" → "books"

    if (routeName == "apiKey") {
        routeName = '';
    }
    
    app.use(`${API_PREFIX}/${routeName}`, route);
  }
});

module.exports = {
  app
};