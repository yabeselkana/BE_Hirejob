const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM experience   ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchExperience = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM experience  where name ilike '%${keyword}%'   `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM experience  WHERE id ='${id}'`);
};

const selectusers = ({ iduser }) => {
  return Pool.query(`SELECT * FROM experience where id_users = '${iduser}'   `);
};

const insert = (data) => {
  const { id, jobdesk, company_name, date_start, date_end, description, id_users } = data;
  // console.log(data);
  return Pool.query(`INSERT INTO experience  ( posisi, nama_perusahaan, dari, sampai, deskripsi, id_users  ) VALUES('${jobdesk}','${company_name}','${date_start}','${date_end}','${description}','${id_users}')`);
};
const update = (data) => {
  const { id, jobdesk, company_name, date_start, date_end, description, id_users } = data;
  return Pool.query(`UPDATE experience  SET posisi='${jobdesk}', nama_perusahaan='${company_name}' ,dari='${date_start}',sampai='${date_end}',deskripsi='${description}' id_users='${id_users}' , WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM experience  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM experience ");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM experience  WHERE id=${id}`, (error, result) => {
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
  selectSearchExperience,
  selectusers,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
