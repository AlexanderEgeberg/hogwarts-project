# api

## Database (dbmate)

[dbmate](https://github.com/amacneil/dbmate) runs plain `.sql` migration files against Postgres. It reads `DATABASE_URL` from `.env` (copy `.env.example` to get started).

| Command | What it does |
| --- | --- |
| `yarn db:new foo` | Creates `db/migrations/<timestamp>_foo.sql` |
| `yarn db:migrate` | Creates the database if needed, then runs all pending migrations |
| `yarn db:seed` | Inserts test data from `db/seed.sql` (expects empty tables) |
| `yarn db:reset` | Drops the database, rebuilds it from all migrations, then seeds it |

A migration file looks like this:

```sql
-- migrate:up
CREATE TABLE houses (
  name TEXT PRIMARY KEY
);

-- migrate:down
```

The `-- migrate:down` line is required, but we leave it empty: instead of rolling back, run `yarn db:reset`.

- Migrations run in filename (timestamp) order.
- dbmate records which ones have run in the `schema_migrations` table, so each runs only once.
- After migrating, dbmate writes the full current schema to `db/schema.sql`. Don't edit it by hand.
