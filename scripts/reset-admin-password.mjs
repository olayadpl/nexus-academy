import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const DB_PATH = process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')
  ? process.env.DATABASE_URL.replace('file:', '')
  : (process.env.DATABASE_URL || './payload.db')

console.log('Using DB:', DB_PATH)

const db = new Database(DB_PATH)

function findAdminTable() {
  const rows = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  const names = rows.map(r => r.name)
  // prefer exact match
  if (names.includes('admins')) return 'admins'
  // fallback: any table with admin in the name
  const alt = names.find(n => /admin/i.test(n))
  return alt
}

const table = findAdminTable()
if (!table) {
  console.error('No admin-like table found in DB')
  process.exit(1)
}

const cols = db.prepare(`PRAGMA table_info(${table})`).all()
const hasEmail = cols.some(c => c.name === 'email')
const hasPassword = cols.some(c => c.name === 'password')
if (!hasEmail || !hasPassword) {
  console.error('Table', table, 'does not look like an admins table. Columns:', cols.map(c=>c.name))
  process.exit(1)
}

const email = process.env.ADMIN_EMAIL || 'olayadpl@gmail.com'
const row = db.prepare(`SELECT rowid, * FROM ${table} WHERE email = ? LIMIT 1`).get(email)
if (!row) {
  console.error('No admin found with email', email)
  process.exit(1)
}

const password = process.env.NEW_ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64').replace(/\/+|\+/g, '_').slice(0, 16)
const hash = bcrypt.hashSync(password, 10)

const res = db.prepare(`UPDATE ${table} SET password = ? WHERE email = ?`).run(hash, email)
console.log(`Updated admin ${email} (table: ${table}). Rows modified: ${res.changes}`)
console.log('New password:', password)

db.close()
