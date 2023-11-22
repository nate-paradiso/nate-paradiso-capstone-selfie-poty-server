/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = knex => {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("user_password", 72).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("images", table => {
      table.increments("image_id").primary();
      table.string("title").notNullable();
      table.string("image").notNullable();
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
export const down = knex => {
  return knex.schema.dropTable("users").dropTable("images");
};
