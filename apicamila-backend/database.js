import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });
}

export async function createTable() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
}
