const Pool = require("../config/db");

const cerateWork = (data) => {
  const { id, name, email, phone, passwordHash, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id, email,password,phone,name,role) VALUES('${id}','${email}','${passwordHash}','${phone}','${name}','${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const cerateRekrut = (data) => {
  const { id, name, email, phone, jabatan, perusahaan, passwordHash, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id, email,password,phone,jabatan,perusahaan,name,role) VALUES('${id}','${email}','${passwordHash}','${phone}','${jabatan}','${perusahaan}','${name}','${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email = '${email}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  cerateWork,
  findEmail,
  cerateRekrut,
};
