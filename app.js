require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/user');
const cardsRouter = require('./routes/card');
const errorMiddleware = require('./middlewares/error');
const authMiddleware = require('./middlewares/auth');
const ApiError = require('./exceptions/api-error');
const userController = require('./controllers/user');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/signin', userController.login);
app.post('/signup', userController.createUser);
app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);
app.all('*', (req, res, next) => {
  next(ApiError.NotFound('Неверный URL'));
});
app.use(errorMiddleware);

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

//  TODO: update profile другого человека
