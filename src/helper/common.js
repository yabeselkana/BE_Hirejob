const response = (res, result, status, message, pagination, role) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  resultPrint.role = role;
  res.status(status).json(resultPrint);
};

module.exports = { response };
