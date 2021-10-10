const ResponseModel = require("../../models/response.model");

function create(req, res) {
  res.json(new ResponseModel(true))
}
function update(req, res) {
  res.json(new ResponseModel(true))
}
function remove(req, res) {
  res.json(new ResponseModel(true))
}
function getOne(req, res) {
  res.json(new ResponseModel(true))
}
function getAll(req, res) {
  res.json(new ResponseModel(true))
}



module.exports = {
  create,
  update,
  remove,
  getOne,
  getAll,
}
