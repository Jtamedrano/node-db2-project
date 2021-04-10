// DO YOUR MAGIC
const { Router } = require("express");
const { getAll, getById, create } = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
const cRoute = Router();

cRoute.get("/", (req, res) => {
  getAll().then((cars) => {
    res.json(cars);
  });
});
cRoute.get("/:id", checkCarId, (req, res) => {
  res.json(req.car);
});

cRoute.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res) => {
    create(req.body).then((id) => {
      getById(id[0]).then((car) => {
        res.json(car);
      });
    });
  }
);

module.exports = cRoute;
