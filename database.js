import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM apousiologia.apousiologio1")
  return rows
}

export async function getNote(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM apousiologia.apousiologio1
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function createNote(firstName, lastName, tmima) {
  const [result] = await pool.query(`
  INSERT INTO apousiologia.apousiologio1 (firstName, lastName, tmima)
  VALUES (?, ?, ?)
  `, [firstName, lastName, tmima])
  const id = result.insertId
  return getNote(id)
}