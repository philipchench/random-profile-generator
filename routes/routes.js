const controller = require("../controllers/controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/add-background", controller.addBackground);

  app.post("/api/add-firstname", controller.addFirstName);

  app.post("/api/add-surname", controller.addSurname);
};
