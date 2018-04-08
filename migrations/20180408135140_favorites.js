
exports.up = function(knex, Promise) {
return knex.schema.createTable('favorites', (table) => {
table.increments()
table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
table.integer('book_id').notNullable().references('id').inTable('books').onDelete('CASCADE')
table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
})

};



exports.down = (knex, Promise) =>
knex.schema.dropTableIfExists('favorites')



// ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         favorites                                               │
// ├────────────────┬─────────────────────────┬──────────────────────────────────────────────────────┤
// │id              │serial                   │primary key                                           │
// │book_id         │integer                  │not null references books(id) on delete cascade index │
// |user_id         │integer                  │not null references users(id) on delete cascade index │
// │created_at      │timestamp with time zone │not null default now()                                │
// │updated_at      │timestamp with time zone │not null default now()                                │
// └────────────────┴─────────────────────────┴──────────────────────────────────────────────────────┘
