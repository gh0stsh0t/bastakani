const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.update = async (req, res, next) => {
  const id = req.userId;
  try {
    const num = await User.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
};

exports.approveAll = async (req, res, next) => {
  try {
    let id = req.body.id;
    const num = await User.update(
      { active: true },
      {
        where: { id },
      }
    );
    if (num == 1) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id.join(
          ", "
        )}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating User with id=" + id.join(", "),
    });
  }
};

exports.findAll = (req, res) => {
  User.findAll({
    attributes: ["id", "email", "createdAt"],
    where: { active: false },
    include: [
      {
        model: db.role,
        where: {
          name: "user",
        },
      },
    ],
    through: { attributes: [] },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.userId;

  User.findByPk(id, {
    attributes: ["email", "firstName", "lastName", "contactNumber"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.deleteAll = async (req, res) => {
  try {
    let id = req.body.id;
    const num = await User.destroy({ where: { id } });
    if (num == 1) {
      res.send({
        message: "Users deleted successfully.",
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id.join(
          ", "
        )}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting User with id=" + id.join(", "),
    });
  }
};
