const { getAll, getById } = require("./cars-model");
const vinValid = require("vin-validator");

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "No id found" });
    return;
  }

  getById(id).then((car) => {
    if (!car) {
      res.status(404).json({ message: `car with id ${id} is not found` });
      return;
    } else {
      req.car = car;
      next();
    }
  });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const testKeys = ["vin", "make", "model", "mileage"];
  const test = { ...req.body };
  const nullList = [];
  for (const key of testKeys) {
    if (test[key] === undefined) nullList.push(`${key} is missing`);
  }

  if (nullList.length > 0) {
    const message = nullList.join("\n");
    res.status(400).json({ message });
    return;
  } else {
    req.vin = req.body.vin;
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (!vinValid.validate(req.vin)) {
    res.status(400).json({ message: `vin ${req.vin} is invalid` });
    return;
  } else next();
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  getAll({ vin: req.vin }).then((car) => {
    if (car) {
      res.status(400).json({ message: `vin ${req.vin} already exists` });
      return;
    } else next();
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
