const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM hiring  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchHirng = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM hiring where name ilike '%${keyword}%'   `);
};
const selectusers = ({ iduser }) => {
  return Pool.query(`SELECT * FROM hiring where id_users = '${iduser}'   `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM hiring WHERE id ='${id}'`);
};
const insert = (data) => {
  const { id, email, project, name, phone, deskripsi, id_rekruter } = data;
  // console.log(data);
  return Pool.query(`INSERT INTO hiring (id, email, project, name, phone, deskripsi, id_rekruter ) VALUES('${id}','${email}','${project}','${name}','${phone}','${deskripsi}','${id_rekruter}')`);
};
const update = (data) => {
  const { id, email, project, name, phone, deskripsi, id_rekruter } = data;
  return Pool.query(`UPDATE hiring SET name='${name}', email='${email}', project='${project}' ,name='${name}' ,phone='${phone}',deskripsi='${deskripsi}',id_rekruter='${id_rekruter}' WHERE id='${id}'`);
};

const updatePhoto = (data) => {
  const { id, photo } = data;
  return Pool.query(`UPDATE hiring SET photo = '${photo}'  WHERE id='${id}'`);
};

const deleteData = (id) => {
  return Pool.query(`DELETE FROM hiring WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM hiring");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM hiring WHERE id=${id}`, (error, result) => {
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
  selectSearchHirng,
  selectusers,
  select,
  insert,
  update,
  updatePhoto,
  deleteData,
  countData,
  findId,
};
