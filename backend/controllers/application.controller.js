const db = require("../models");
const Application = db.applications;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {};
exports.update = async (req, res, next) => {
  const id = req.params.id;
  try {
    const num = await Application.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Application was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Application with id=" + id,
    });
  }
};
exports.findAll = (req, res) => {
  Application.findAll({})
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
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Application with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Application with id=" + id,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  let application = null;

  try {
    application = await Application.findByPk(id);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Application with id=" + id,
    });
  }

  if (!application) {
    res.status(404).send({
      message: `Cannot find Application with id=${id}.`,
    });
  }

  try {
    application.active = false;
    await application.save();
    res.send({
      message: "Application was updated successfully.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Application with id=" + id,
    });
  }
};

exports.deleteAll = (req, res) => {};
