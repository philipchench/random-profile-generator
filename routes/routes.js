const controller = require("../controllers/controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/random-profile-main", controller.randomProfileMain);

  app.post("/api/add-profile-main", controller.addProfileMain);
};
