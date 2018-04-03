exports.up = (knex, Promise) => {
  return knex.schema.createTable('books', (table) => {
    table.increments()
    table.varchar('title', 255).notNullable().defaultTo('')
    table.varchar('author', 255).notNullable().defaultTo('')
    table.varchar('genre', 255).notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
    table.text('cover_url').notNullable().defaultTo('')
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
};





exports.down = (knex, Promise) => knex.schema.dropTableIfExists('books')

/*
```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          books                                           │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│title        │varchar(255)             │not null default ''                               │
│author       │varchar(255)             │not null default ''                               │
│genre        │varchar(255)             │not null default ''                               │
│description  │text                     │not null default ''                               │
│cover_url    │text                     │not null default ''                               │
│created_at   │timestamp with time zone │not null default now()                            │
│updated_at   │timestamp with time zone │not null default now()                            │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
```
*/
