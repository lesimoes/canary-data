### How to run

```shell
docker compose up -d
```

If there isn't a db schema on docker volume this command will create database schema and table, otherwise run this SQL script on the database.

```sql
CREATE TABLE IF NOT EXISTS document (
  id                SERIAL PRIMARY KEY,
  document_id       TEXT,
  accession_number  TEXT NOT NULL,
  content           TEXT NOT NULL,
  file_name         TEXT NOT NULL,
  form              TEXT NOT NULL,
  adsh              TEXT NOT NULL,
  file_date         DATE NOT NULL
);
```


### Backend
1. Swagger for API documentation
2. Vertical slice architecture
3. Result Pattern: To avoid throw exceptions and "break code flow".
4. After each document request the result will be save on database, like lazy-load strategy.


### Frontend

1. React-query for data-fetch with cache and state management 
