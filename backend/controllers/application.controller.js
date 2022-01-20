const db = require("../models");
const Application = db.applications;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const id = req.userId;
  Application.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNumber: req.body.contactNumber,
    userId: id,
    approved: false,
  })
    .then(() => {
      res.send({ message: "Application was created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Application.findAll({ where: { approved: false } })
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

exports.deleteAll = async (req, res) => {
  try {
    let id = req.body.id;
    const num = await Application.destroy({ where: { id } });
    if (num == 1) {
      res.send({
        message: "Applications deleted successfully.",
      });
    } else {
      res.send({
        message: `Cannot delete Application with id=${id.join(
          ", "
        )}. Maybe Application was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting Application with id=" + id.join(", "),
    });
  }
};
exports.approveAll = async (req, res) => {
  try {
    let id = req.body.id;
    const num = await Application.update(
      { approved: true },
      {
        where: { id },
      }
    );
    if (num >= 1) {
      res.send({
        message: "Applcation was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Application with id=${id.join(
          ", "
        )}. Maybe Application was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Application with id=" + id.join(", "),
    });
  }
};
