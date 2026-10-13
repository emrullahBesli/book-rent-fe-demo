const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const { requestId } = require('./middlewares/requestId.middleware');
const { notFound } = require('./middlewares/notFound.middleware');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestId);
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
