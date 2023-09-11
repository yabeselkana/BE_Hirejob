const Pool = require("../config/db");
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const createWork = (data) => {
  const { id, email, passwordHash, phone, name, role, verify } = data;
  return Pool.query(`INSERT INTO users(id, email, password, phone, name, role,verify) VALUES ('${id}','${email}','${passwordHash}','${phone}','${name}','${role}','${verify}')`);
};

const createRekrut = (data) => {
  const { id, email, passwordHash, phone, jabatan, perusahaan, name, role, verify } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users (id, email, password, phone, jabatan, perusahaan, name, role, verify) VALUES('${id}','${email}','${passwordHash}','${phone}','${jabatan}','${perusahaan}','${name}','${role}','${verify}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const createUsersVerification = (users_verification_id, users_id, token) => {
  return Pool.query(`insert into users_verification ( id , users_id , token ) values ( '${users_verification_id}' , '${users_id}' , '${token}' )`);
};

const checkUsersVerification = (queryUsersId, queryToken) => {
  return Pool.query(`select * from users_verification where users_id='${queryUsersId}' and token = '${queryToken}' `);
};

const cekUser = (email) => {
  return Pool.query(`select verify from users where email = '${email}' `);
};

const deleteUsersVerification = (queryUsersId, queryToken) => {
  return Pool.query(`delete from users_verification  where users_id='${queryUsersId}' and token = '${queryToken}' `);
};

const updateAccountVerification = (queryUsersId) => {
  return Pool.query(`update users set verify='true' where id='${queryUsersId}' `);
};

const findId = (id) => {
  return Pool.query(`select * from users where id='${id}'`);
};

module.exports = {
  findEmail,
  createWork,
  createRekrut,
  createUsersVerification,
  checkUsersVerification,
  deleteUsersVerification,
  updateAccountVerification,
  findId,
  cekUser,
};
