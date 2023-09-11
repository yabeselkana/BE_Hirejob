const createError = require("http-errors");
const { selectAll, selectSearchHirng, selectusers, select, insert, update, updatePhoto, deleteData, countData, findId } = require("../model/hiring");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
const sendHiring = require("../middlewares/sendrorker");
const Joi = require("joi");
// const user = require('../controller/users')
let hiringController = {
  getAllHiring: async (req, res, next) => {
    try {
      // const role = req.payload.role;
      // //  console.log(role)
      //   if(role === "reseller"){
      //     return next(createError(403,`${role} not get data`))
      //   }
      const keyword = req.query.keyword || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAll({ limit, offset, sort, sortby, keyword });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getSearchHiring: async (req, res, next) => {
    try {
      // const role = req.payload.role
      // //  console.log(role)
      //   if(role === "reseller"){
      //     return next(createError(403,`${role} not get data`))
      //   }
      // const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const keyword = req.query.keyword || "";
      const result = await selectSearchHirng({ keyword, sort });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  getIdUsers: async (req, res, next) => {
    try {
      // const role = req.payload.role
      // //  console.log(role)
      //   if(role === "reseller"){
      //     return next(createError(403,`${role} not get data`))
      //   }
      // const sortby = req.query.sortby || "id";

      const iduser = req.query.iduser || "";
      const result = await selectusers({ iduser });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailHiring: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if(role === "reseller"){
    //   return next(createError(403,`${role} not get data`))
    // }
    const id = Number(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    select(id)
      .then((result) => {
        // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(res, result.rows, 200, "get data success from database", {});
      })
      .catch((err) => res.send(err));
  },
  createHiring: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if (role !== "reseller") {
    //   return next(createError(403, `${role} Not Entri Data`));
    // }

    const { email, project, name, nama_perushan, phone, deskripsi, id_rekruter } = req.body;
    // const Schema = Joi.object({
    //   email: Joi.string().required(),
    //   project: Joi.string().required(),
    //   name: Joi.string().required(),
    //   nama_perushan: Joi.string(),
    //   email: Joi.string().required(),
    //   phone: Joi.string(),
    //   deskripsi: Joi.string().required(),
    //   id_rekruter: Joi.string().required(),
    // });
    // const results = Schema.validate(req.body, { abortEarly: false });

    // const { value, error } = results;

    // if (error) {
    //   return next(error);
    // }
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const PORT = process.env.PORT || 4000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    // console.log("berhasil");
    const data = {
      id,
      email,
      project,
      name,
      phone,
      deskripsi,
      id_rekruter,
    };
    const dataHiring = {
      id,
      email,
      project,
      name,
      nama_perushan,
      phone,
      deskripsi,
      id_rekruter,
    };

    console.log(dataHiring);

    await insert(data)
      .then((result) => commonHelper.response(res, data, 201, "Hiring created", {}))
      .catch((err) => res.send(err));

    await sendHiring(email, nama_perushan, project, name, phone, deskripsi, `Job Offer: ${name} at ${project}`);
  },

  deleteHiring: async (req, res, next) => {
    try {
      // const role = req.payload.role;
      // //  console.log(role)
      // if (role !== "reseller") {
      //   return next(createError(403, `${role} Not Entri Data`));
      // }
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Rekruter deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = hiringController;
