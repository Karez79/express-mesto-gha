require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/user');
const cardsRouter = require('./routes/card');
const errorMiddleware = require('./middlewares/error');
const ApiError = require('./exceptions/api-error');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64c81793e4c3c7f02bd8501d',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.all('*', (req, res, next) => {
  next(ApiError.NotFound('Неверный URL'));
});
app.use(errorMiddleware);

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

//  TODO:
//  переименовать файлы, пофиксить ругание require(dotenv)
