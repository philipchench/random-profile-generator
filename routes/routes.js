const controller = require("../controllers/controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/add-ethnicity", controller.addEthnicity);

  app.post("/api/add-first-name", controller.addFirstName);

  app.post("/api/add-last-name", controller.addLastName);
};
