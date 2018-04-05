exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.varchar('first_name', 255).notNullable().defaultTo('')
    table.varchar('last_name', 255).notNullable().defaultTo('')
    table.varchar('email', 255).notNullable().unique()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))

  })



};

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('users')


//
// ┌──────────────────────────────────────────────────────────────────┐
// │                              users                               │
// ├────────────────┬─────────────────────────┬───────────────────────┤
// │id              │serial                   │primary key            │
// │first_name      │varchar(255)             │not null default ''    │
// │last_name       │varchar(255)             │not null default ''    │
// │email           │varchar(255)             │not null unique        │
// |hashed_password |char(60)                 │not null               │
// │created_at      │timestamp with time zone │not null default now() │
// │updated_at      │timestamp with time zone │not null default now() │
// └────────────────┴─────────────────────────┴───────────────────────┘
//
