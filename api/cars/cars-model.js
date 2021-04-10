const db = require("../../data/db-config");

const getAll = (data = {}) => {
  // DO YOUR MAGIC
  return db("cars").where(data);
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where({ id }).first();
};

const create = (car) => {
  // DO YOUR MAGIC
  return db("cars").insert(car);
};

module.exports = { getAll, getById, create };
