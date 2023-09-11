const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { findEmail, createWork, createRekrut, createUsersVerification, checkUsersVerification, deleteUsersVerification, updateAccountVerification, findId, cekUser } = require("../model/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const sendEmail = require("../middlewares/sendemail");
const crypto = require("crypto");
const Joi = require("joi");

let usersController = {
  registerWork: async (req, res, next) => {
    try {
      const { name, email, phone, password } = req.body;
      const checkEmail = await findEmail(email);

      try {
        if (checkEmail.rowCount == 1) throw "Email already used";
        // delete checkEmail.rows[0].password;
      } catch (error) {
        delete checkEmail.rows[0].password;
        return commonHelper.response(res, null, 403, error);
      }

      // users
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(password, saltRounds);
      const id = uuidv4().toLocaleLowerCase();

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
      });
      const { error, value } = Schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return next(createError(404, error));
      }

      // verification
      // verification
      const verify = "false";
      const role = "worker";
      const users_verification_id = uuidv4().toLocaleLowerCase();
      const users_id = id;
      const token = crypto.randomBytes(64).toString("hex");

      // url localhost
      const url = `${process.env.BASE_URL}users/verify?id=${users_id}&token=${token}`;

      // url deployment
      // const url = `${process.env.BASE_URL}/verification?type=email&id=${users_id}&token=${token}`;

      //send email
      await sendEmail(email, "Verify Email", url);

      const data = {
        id,
        name,
        email,
        phone,
        passwordHash,
        role,
        verify,
      };

      // insert db table users
      console.log(data);
      await createWork(data)
        .then((result) => {
          commonHelper.response(res, data, 201, "Register created");
        })
        .catch((err) => {
          console.log(err);
        });

      // insert db table verification
      await createUsersVerification(users_verification_id, users_id, token);

      commonHelper.response(res, null, 201, "Sign Up Success, Please check your email for verification");
    } catch (error) {
      console.log(error);
      res.send(createError(400));
    }
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
    const checkEmail = await findEmail(email);

    try {
      if (checkEmail.rowCount == 1) throw "Email already used";
      // delete checkEmail.rows[0].password;
    } catch (error) {
      delete checkEmail.rows[0].password;
      return commonHelper.response(res, null, 403, error);
    }

    // users
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const id = uuidv4().toLocaleLowerCase();

    // verification
    const verify = "false";

    const users_verification_id = uuidv4().toLocaleLowerCase();
    const users_id = id;
    const token = crypto.randomBytes(64).toString("hex");

    // url localhost
    const url = `${process.env.BASE_URL}users/verify?id=${users_id}&token=${token}`;

    // url deployment
    // const url = `${process.env.BASE_URL}/verification?type=email&id=${users_id}&token=${token}`;

    //send email
    await sendEmail(email, "Verify Email", url);

    const data = {
      id,
      name,
      email,
      phone,
      perusahaan,
      jabatan,
      passwordHash,
      role,
      verify,
    };
    createRekrut(data);
    // .then((result) => {
    //   commonHelper.response(res, data, 201, "Register created");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    await createUsersVerification(users_verification_id, users_id, token);

    commonHelper.response(res, null, 201, "Sign Up Success, Please check your email for verification");
  },

  VerifyAccount: async (req, res) => {
    try {
      const queryUsersId = req.query.id;
      const queryToken = req.query.token;

      if (typeof queryUsersId === "string" && typeof queryToken === "string") {
        const checkUsersVerify = await findId(queryUsersId);

        if (checkUsersVerify.rowCount == 0) {
          return commonHelper.response(res, null, 403, "Error users has not found");
        }

        if (checkUsersVerify.rows[0].verify != "false") {
          return commonHelper.response(res, null, 403, "Users has been verified");
        }

        const result = await checkUsersVerification(queryUsersId, queryToken);

        if (result.rowCount == 0) {
          return commonHelper.response(res, null, 403, "Error invalid credential verification");
        } else {
          await updateAccountVerification(queryUsersId);
          await deleteUsersVerification(queryUsersId, queryToken);
          commonHelper.response(res, null, 200, "Users verified succesful");
        }
      } else {
        return commonHelper.response(res, null, 403, "Invalid url verification");
      }
    } catch (error) {
      console.log(error);

      // res.send(createError(404));
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const {
        rows: [verify],
      } = await cekUser(email);
      console.log(verify.verify);
      if (verify.verify === "false") {
        return res.json({
          message: "user is unverify",
        });
      }
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return commonHelper.response(res, null, 403, "Email is invalid");
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log(isValidPassword);

      if (!isValidPassword) {
        return commonHelper.response(res, null, 403, "Password is invalid");
      }
      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refershToken(payload);

      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  sendEmail: async (req, res, next) => {
    const { email } = req.body;
    await sendEmail(email, "Verify Email", url);
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
    commonHelper.response(res, result, 200);
  },
};

module.exports = usersController;
