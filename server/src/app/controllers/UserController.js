const { User } = require("../models");

class UserController {
  async index(req, res) {
    const user = req.user;

    return res.json(user);
  }

  async getAll(req, res) {
    var result = [];

    result = await User.findAll();

    return res.json(result);
  }

  async get(req, res) {
    let id = req.param.id

    result = await User.findOne({
      where: {
        id: id,
      }
    })
  }

  async store(req, res) {
    try {
      var user = await User.create({ ...req.body });

      return res.json(
        {
        name: user.name,
        email: user.email, 
        password: user.password_hash,
        cpf: user.cpf,
        type: user.type,
      });
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async update(req, res) {
    const user = req.user;

    const param = {
      name: req.body.name,
      email: req.body.email,
      password_hash: req.body.password,
      course: req.body.course,
      cpf: req.body.cpf,
      type: req.body.type,
    };

    if (req.body.password) param.password_hash = req.body.password;

    user.update(param);

    return res.json({
      user
    });
  }

  async delete(req, res) {
    const user = req.user;

    user.destroy();

    return res.json({ msg: "Success user deleted" });
  }
}

module.exports = new UserController();
