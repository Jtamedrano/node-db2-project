// DO YOUR MAGIC

exports.up = async function (knex) {
  return await knex.schema.createTable("cars", (cTable) => {
    cTable.increments("id").unsigned();
    cTable.string("vin").notNullable().unique();
    cTable.string("make").notNullable();
    cTable.string("model").notNullable();
    cTable.integer("mileage").notNullable();
    cTable.string("title").nullable();
    cTable.string("transmission").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTableIfExists("cars");
};
