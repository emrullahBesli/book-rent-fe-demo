const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('./app');

const PORT = Number(process.env.API_PORT) || 3001;

app.listen(PORT, () => {
  console.log(`API http://127.0.0.1:${PORT}/api/v1`);
});
