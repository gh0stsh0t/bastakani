var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bcrypt = require("bcryptjs");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var applicationsRouter = require("./routes/applications");

var app = express();

if (process.env.NODE_ENV !== "production") {
  var corsOptions = {
    origin: "http://localhost:3000",
  };
}

app.use(cors(corsOptions));

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/build")));
const db = require("./models");

function initial() {
  db.role.create({
    id: 1,
    name: "user",
  });

  db.role
    .create({
      id: 2,
      name: "admin",
    })
    .then(() => {
      db.user
        .create({
          email: "admin@test.com",
          password: bcrypt.hashSync("admintest", 8),
          active: true,
        })
        .then((user) => {
          user.setRoles([2]);
        });
    });
}
db.sequelize.sync({ force: true }).then(() => {
  initial();
});

if (process.env.NODE_ENV === "production") {
  app.get("/*", function (req, res) {
    res.sendFile(path + "index.html");
  });
}

app.use("/api/users", usersRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
