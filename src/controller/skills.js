const createError = require("http-errors");
const { selectAll, selectSearchSkills, selectusersSkills, select, countData, findId, insert, update, deleteData } = require("../model/skills");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");

const Joi = require("joi");
// const user = require('../controller/users')
let skillsController = {
  getAllSkills: async (req, res, next) => {
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
  getSearchSkills: async (req, res, next) => {
    try {
      // const role = req.payload.role
      // //  console.log(role)
      //   if(role === "reseller"){
      //     return next(createError(403,`${role} not get data`))
      //   }
      // const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const keyword = req.query.keyword || "";
      const result = await selectSearchSkills({ keyword, sort });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getIdUsersSkills: async (req, res, next) => {
    try {
      const iduser = req.query.iduser || "";
      console.log(iduser);
      const result = await selectusersSkills({ iduser });
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
  getDetailSkills: async (req, res, next) => {
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

  createSkills: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if (role !== "reseller") {
    //   return next(createError(403, `${role} Not Entri Data`));
    // }

    const { name, id_users } = req.body;
    // const Schema = Joi.object({
    //   skliis: Joi.string().required(),
    //   id_users: Joi.string(),
    // });
    // const results = Schema.validate(req.body);
    // const { value, error } = results;

    // if (error) {
    //   return next(error);
    // }

    // const result = await cloudinary.uploader.upload(req.file.path);
    // const photo = result.secure_url;

    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const PORT = process.env.PORT || 4000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    // console.log("berhasil");
    const data = {
      id,
      name,
      id_users,
    };
    console.log(data);
    insert(data)
      .then((result) => commonHelper.response(res, data, 201, "Skills created", {}))
      .catch((err) => res.send(err));
  },
  updateSkills: async (req, res, next) => {
    try {
      // const role = req.payload.role;
      // //  console.log(role)
      // if (role !== "reseller") {
      //   return next(createError(403, `${role} Not Update Data`));
      // }
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);
      // const result = await cloudinary.uploader.upload(req.file.path);
      // const photo = result.secure_url;
      // const cloudinary_id = result.public_id;
      const { skliis } = req.body;
      const Schema = Joi.object({
        skliis: Joi.string(),
      });
      const results = Schema.validate(req.body);
      const { value, error } = results;

      if (error) {
        return next(error);
      }
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        skliis,
      };
      // console.log(data)
      update(data)
        .then((result) => commonHelper.response(res, data, 200, "Skills updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteSkills: async (req, res, next) => {
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
        .then((result) => commonHelper.response(res, result.rows, 200, "Skills deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = skillsController;
