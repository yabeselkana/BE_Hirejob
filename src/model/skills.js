const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM skills  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchSkills = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM skills where name ilike '%${keyword}%'   `);
};

const selectusersSkills = ({ iduser }) => {
  return Pool.query(`SELECT * FROM skills WHERE id_users = '${iduser}' `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM skills WHERE id ='${id}'`);
};
const insert = (data) => {
  const { id, name, id_users } = data;
  // console.log(data);
  return Pool.query(`INSERT INTO skills (name, id_users ) VALUES( '${name}','${id_users}')`);
};
const update = (data) => {
  const { id, name } = data;
  return Pool.query(`UPDATE skills SET name='${name}'WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM skills WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM skills");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM skills WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAll,
  selectSearchSkills,
  selectusersSkills,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
