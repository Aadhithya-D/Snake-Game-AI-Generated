
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

export function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS high_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        score INTEGER NOT NULL
      )
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function updateHighScore(score: number) {
  return new Promise<void>((resolve, reject) => {
    db.run(`
      INSERT INTO high_scores (score) VALUES (?)
    `, [score], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getHighScore() {
  return new Promise<number>((resolve, reject) => {
    db.get(`
      SELECT MAX(score) as highScore FROM high_scores
    `, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.highScore || 0);
      }
    });
  });
}
