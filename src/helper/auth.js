const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
    issuer: "tokoku",
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts);
  return token;
};
const refershToken = (payload) => {
  const verifyOpts = { expiresIn: "1d" };
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts);
  return token;
};

module.exports = { generateToken, refershToken };
