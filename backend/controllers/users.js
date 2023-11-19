const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { NODE_ENV, JWT_SECRET } = process.env;

const ValidationError = require("../errors/ValidationError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const CastError = require("../errors/CastError");

const saltRounds = 10;

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      UserModel.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          return res.status(201).send({ name, about, avatar, email });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new ConflictError("Пользователь с таким email уже существует")
            );
          }
          if (err.name === "ValidationError") {
            return next(new ValidationError("Некорректные данные"));
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        // "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res
        .cookie("jwt", token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: "none",
          secure: false,
        })
        .send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  UserModel.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  const owner = req.user._id;

  UserModel.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Переданы некорректные данные");
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const id = req.params.userId;

  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Переданы некорректные данные");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new CastError("Некорректные данные"));
      }
      return next(err);
    });
};

const updateUserById = (req, res, next) => {
  const owner = req.user._id;
  const userData = req.body;

  UserModel.findByIdAndUpdate(owner, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден."));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new ValidationError("Некорректные данные"));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const owner = req.user._id;
  const userData = req.body;

  UserModel.findByIdAndUpdate(owner, userData, { new: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден."));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new ValidationError("Некорректные данные"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getMyInfo,
  getUserById,
  updateUserById,
  updateUserAvatar,
  login,
};
