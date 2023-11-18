require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
// const cors = require("./middlewares/cors");
const cors = require("cors");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const cookieParser = require("cookie-parser");
const { login, createUser } = require("./controllers/users");
const { celebrate, Joi, errors } = require("celebrate");
const auth = require("./middlewares/auth");
const handleError = require("./middlewares/handleError");
const LinkPattern = require("./utils/avatarPattern");
const NotFoundError = require("./errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  });

const app = express();

// app.use(cors);
app.use(
  cors({
    origin: [
      "http://localhost:3005",
      "http://localhost:3000",
      "https://mesto.n1ght.nomoredomainsmonster.ru",
      "http://mesto.n1ght.nomoredomainsmonster.ru",
      "https://api.mesto.n1ght.nomoredomainsmonster.ru",
      "http://api.mesto.n1ght.nomoredomainsmonster.ru",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("hello");
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(LinkPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);
app.all("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
