CREATE DATABASE IF NOT EXISTS canary;

\c db

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