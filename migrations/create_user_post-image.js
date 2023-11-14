/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("user_password", 8).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("images", table => {
      table.increments("image_id").primary();
      table.string("title").notNullable();
      table.string("filename").notNullable();
      table.string("category").notNullable();
      table.integer("likes").notNullable().defaultTo(0);
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("images");
};
