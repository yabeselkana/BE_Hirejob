const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, keyword }) => {
  return Pool.query(`SELECT * FROM rekrut  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchRekrut = ({ keyword, sort }) => {
  return Pool.query(`SELECT * FROM rekrut where name ilike '%${keyword}%'   `);
};
const selectusers = ({ iduser }) => {
  return Pool.query(`SELECT * FROM rekrut where id_users = '${iduser}'   `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM rekrut WHERE id ='${id}'`);
};
const insert = (data) => {
  const { id, name, bidang, provinsi, photo, kota, deskripsi, email, email_perusahaan, phone, linkedin, id_users } = data;
  // console.log(data);
  return Pool.query(
    `INSERT INTO rekrut (name, bidang, provinsi, photo, kota, deskripsi, email, email_perusahaan, phone, linkedIn,id_users ) VALUES('${name}','${bidang}','${provinsi}','${photo}','${kota}','${deskripsi}','${email}','${email_perusahaan}','${phone}','${linkedin}','${id_users}')`
  );
};
const update = (data) => {
  const { id, name, bidang, provinsi, photo, kota, deskripsi, email, email_perusahaan, phone, linkedin } = data;
  return Pool.query(
    `UPDATE rekrut SET name='${name}', bidang='${bidang}', provinsi='${provinsi}' ,photo='${photo}' ,kota='${kota}',deskripsi='${deskripsi}',email='${email}',email_perusahaan='${email_perusahaan}',phone='${phone}',linkedIn='${linkedin}' WHERE id='${id}'`
  );
};

const updatePhoto = (data) => {
  const { id, photo } = data;
  return Pool.query(`UPDATE rekrut SET photo='${photo}'  WHERE id='${id}'`);
};

const deleteData = (id) => {
  return Pool.query(`DELETE FROM rekrut WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM rekrut");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM rekrut WHERE id=${id}`, (error, result) => {
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
  selectSearchRekrut,
  selectusers,
  select,
  insert,
  update,
  updatePhoto,
  deleteData,
  countData,
  findId,
};
