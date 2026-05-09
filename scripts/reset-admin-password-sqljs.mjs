import fs from 'node:fs'
import initSqlJs from 'sql.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const DB_PATH = process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')
  ? process.env.DATABASE_URL.replace('file:', '')
  : (process.env.DATABASE_URL || './payload.db')

console.log('Using DB:', DB_PATH)

const filebuffer = fs.readFileSync(DB_PATH)

import path from 'node:path'
const wasmFile = path.resolve(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm')
initSqlJs({
  locateFile: () => wasmFile,
}).then(SQL => {
  const u8 = new Uint8Array(filebuffer)
  const db = new SQL.Database(u8)

  // find a table that looks like admins
  const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table'")
  const names = (tables[0] && tables[0].values) ? tables[0].values.flat() : []
  let table = names.find(n => n === 'admins') || names.find(n => /admin/i.test(n))
  if (!table) {
    console.error('No admin-like table found. Tables:', names)
    process.exit(1)
  }

  // check columns
  const info = db.exec(`PRAGMA table_info(${table})`)
  const cols = (info[0] && info[0].values) ? info[0].values.map(r => r[1]) : []
  // if password column not present, print row for inspection
  if (!cols.includes('email') || (!cols.includes('password') && !(cols.includes('salt') && cols.includes('hash')))) {
    const sample = db.exec(`SELECT * FROM ${table} LIMIT 1`)
    console.error('Table', table, 'columns:', cols)
    console.error('Sample row:', sample[0] && sample[0].values ? sample[0].values[0] : sample)
    console.error('Cannot safely set password for this schema automatically. The table does not use a single `password` column.')
    process.exit(1)
  }

  const email = process.env.ADMIN_EMAIL || 'olayadpl@gmail.com'
  const row = db.exec(`SELECT rowid, * FROM ${table} WHERE email = '${email.replace(/'/g,"''")}' LIMIT 1`)
  if (!row || !row[0] || !row[0].values || row[0].values.length === 0) {
    console.error('No admin found with email', email)
    process.exit(1)
  }

  // If single password column exists, update using bcrypt
  if (cols.includes('password')) {
    const password = process.env.NEW_ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64').replace(/\/+|\+/g, '_').slice(0, 16)
    const hash = bcrypt.hashSync(password, 10)

    db.run(`UPDATE ${table} SET password = ? WHERE email = ?`, [hash, email])

    // export and save
    const out = db.export()
    fs.writeFileSync(DB_PATH, Buffer.from(out))
    console.log('Updated admin', email)
    console.log('New password:', password)
    process.exit(0)
  }

  // If schema uses salt+hash, show values and abort (safe manual step)
  const rowValues = row[0].values[0]
  const colNames = (db.exec(`PRAGMA table_info(${table})`)[0].values || []).map(r=>r[1])
  const dataObj = {}
  colNames.forEach((c,i)=> dataObj[c]=rowValues[i])
  console.error('Detected salt/hash schema. Sample admin row:', dataObj)
  console.error('\nAutomatic password replacement for salt/hash schema is unsafe. You can either:\n1) Use Payload server API to update password (recommended) or\n2) Provide the hashing algorithm and parameters so the script can compute salt/hash.\n')
  process.exit(1)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
