const ResponseModel = require("../../models/response.model");
const articleService = require("../../services/article.service");

async function create(req, res) {
  try {
    const result = await articleService.create(req.body, req.user.id);
    res.json(new ResponseModel(result));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}

async function update(req, res) {
  try {
    const result = await articleService.update(parseInt(req.params.id), req.user.role.name, req.user.id, req.body);
    res.json(new ResponseModel(result));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}

async function remove(req, res) {
  try {
    const result = await articleService.destroy(parseInt(req.params.id), req.user.role, req.user.id);
    res.json(new ResponseModel(result));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}

async function getOne(req, res) {
  try {
    const result = await articleService.findByPk(parseInt(req.params.id), req.user.role.name, req.user.id);
    res.json(new ResponseModel(result));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}

async function getAll(req, res) {
  try {
    const result = await articleService.findAll();
    res.json(new ResponseModel(result));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}


module.exports = {
  create,
  update,
  remove,
  getOne,
  getAll,
};
