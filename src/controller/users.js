const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { cerate, findEmail, cerateWork, cerateRekrut } = require("../model/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const Joi = require("joi");

let usersController = {
  registerWork: async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    const Schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-zA-Z\s]+$/)
        .required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^\d{10,12}$/)
        .required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
      role: Joi.string(),
    });
    const { error, value } = Schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(createError(404, error));
    }
    const { rowCount } = await findEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    if (rowCount) {
      return next(createError(403, "Email is already used"));
    }
    const data = {
      id,
      name,
      email,
      phone,
      passwordHash,
      role,
    };
    cerateWork(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Register created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  registerRekrut: async (req, res, next) => {
    const { name, email, phone, perusahaan, jabatan, password, role } = req.body;
    const Schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-zA-Z\s]+$/)
        .required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^\d{10,12}$/)
        .required(),
      perusahaan: Joi.string().min(3).max(15).required(),
      jabatan: Joi.string().min(3).max(15).required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
      role: Joi.string(),
    });
    const { error, value } = Schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(error);
    }
    const { rowCount } = await findEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    if (rowCount) {
      return next(createError(403, "Email is already used"));
    }
    const data = {
      id,
      name,
      email,
      phone,
      perusahaan,
      jabatan,
      passwordHash,
      role,
    };
    cerateRekrut(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Register created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return next(createError(403, "Email false"));
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(createError(403, "password false"));
    }

    delete user.password;
    const payload = {
      email: user.email,
      role: user.role,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refershToken(payload);
    commonHelper.response(res, user, 201, "login is successful");
  },

  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken;
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refershToken(payload),
    };
    commonHelper.response(res, result, 200, "Refersh Token is successful");
  },
};

module.exports = usersController;
