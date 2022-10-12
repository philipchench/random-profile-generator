const controller = require("../controllers/controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization, X-Requested-With"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );

    next();
  });

  app.post("/api/add-background", controller.addBackground);

  app.post("/api/add-firstname", controller.addFirstName);

  app.post("/api/add-surname", controller.addSurname);
};
