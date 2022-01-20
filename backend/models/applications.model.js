module.exports = (sequelize, Sequelize) => {
  const Application = sequelize.define("application", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.DATEONLY,
    },
    height: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
  });

  return Application;
};
