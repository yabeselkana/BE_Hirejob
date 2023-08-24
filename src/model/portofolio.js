const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM portfolio  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchPortofolio = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM portfolio where name ilike '%${keyword}%'   `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM portfolio WHERE id ='${id}'`);
};

const selectusers = ({ iduser }) => {
  return Pool.query(`SELECT * FROM portfolio where id_users = '${iduser}'   `);
};

const insert = (data) => {
  const { id, name_portfolio, repo_link, type_portfolio, photo, id_users } = data;
  // console.log(data);
  return Pool.query(`INSERT INTO portfolio (name, link, type_portofolio , photo, id_users ) VALUES('${name_portfolio}','${repo_link}','${type_portfolio}','${photo}','${id_users}')`);
};
const update = (data) => {
  const { name_portfolio, repo_link, type_portfolio, photo, id_users } = data;
  return Pool.query(`UPDATE portfolio SET name='${name_portfolio}', link='${repo_link}', type_portofolio='${type_portfolio}' ,photo='${photo}',id_users='${id_users}', WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM portfolio WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM portfolio");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM portfolio WHERE id=${id}`, (error, result) => {
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
  selectSearchPortofolio,
  selectusers,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
