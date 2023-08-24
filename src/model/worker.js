const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM worker  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectusers = ({ iduser }) => {
  return Pool.query(`SELECT * FROM worker where id_users = '${iduser}'   `);
};

const selectSearchWork = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM worker where name ilike '%${keyword}%'   `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM worker WHERE id ='${id}'`);
};
const insert = (data) => {
  const { id, name, jobdesk, domisili, photo, status_kerja, tempat_kerja, id_users, deskripsi } = data;
  // console.log(data);
  return Pool.query(
    `INSERT INTO worker (name,jobdesk ,domisili,photo ,status_kerja,tempat_kerja,id_users ,deskripsi ) VALUES('${name}','${jobdesk}','${domisili}','${photo}','${status_kerja}','${tempat_kerja}','${id_users}','${deskripsi}')`
  );
};
const update = (data) => {
  const { id, name, jobdesk, domisili, photo, status_kerja, tempat_kerja, id_users, deskripsi } = data;
  return Pool.query(
    `UPDATE worker SET name='${name}', jobdesk='${jobdesk}', domisili='${domisili}' ,photo='${photo}' ,status_kerja='${status_kerja}',tempat_kerja='${tempat_kerja}',id_users='${id_users}',deskripsi='${deskripsi}' WHERE id='${id}'`
  );
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM worker WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM worker");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM worker WHERE id=${id}`, (error, result) => {
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
  selectSearchWork,
  selectusers,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
