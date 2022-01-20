const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.applications = require("./applications.model.js")(sequelize, Sequelize);
db.user = require("../models/users.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.user.hasMany(db.applications, { foreignKey: "userId" });
db.applications.belongsTo(db.user);

db.ROLES = ["user", "admin"];

module.exports = db;
