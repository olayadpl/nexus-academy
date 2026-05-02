import payload from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import bcrypt from 'bcryptjs'

async function main() {
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret-change-me'
  const dbUrl = process.env.DATABASE_URL || 'file:./payload.db'

  const adminsCollection = {
    slug: 'admins',
    auth: true,
    admin: { useAsTitle: 'email' },
    access: { read: () => false },
    fields: [
      { name: 'email', type: 'email', required: true },
      { name: 'name', type: 'text' },
      { name: 'password', type: 'password', required: true },
    ],
  }

  const config = buildConfig({ secret, collections: [adminsCollection], db: sqliteAdapter({ client: { url: dbUrl } }) })

  await payload.init({ secret, config })

  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'changeme'

  try {
    console.log('Payload API methods:', Object.keys(payload).filter(k => typeof payload[k] === 'function'))
    // Try using payload.login() helper
    try {
      const res1 = await payload.login({ collection: 'admins', email, password })
      console.log('payload.login({collection,email,password}) result:', res1)
    } catch (e) {
      console.log('login signature 1 failed:', e && e.message)
    }

    try {
      const res2 = await payload.login({ collection: 'admins', data: { email, password } })
      console.log('payload.login({collection,data}) result:', res2)
    } catch (e) {
      console.log('login signature 2 failed:', e && e.message)
    }

    const result = await payload.find({ collection: 'admins', where: { email: { equals: email } }, overrideAccess: true })
    const docs = result?.docs || result?.rows || result || []
    if (!docs || docs.length === 0) {
      console.error('No admin found with email', email)
      process.exitCode = 2
      return
    }
    const admin = docs[0]
    console.log('Admin record:', Object.keys(admin))
    const hashed = admin.password || admin._password || admin.passwordHash || admin.hash
    console.log('Detected hash field length:', typeof hashed === 'string' ? hashed.length : typeof hashed)
    const ok = hashed ? await bcrypt.compare(password, hashed) : false
    if (ok) console.log('Login success for', email)
    else console.log('Login failed: invalid password')
  } catch (err) {
    console.error('Error testing login:', err)
    process.exitCode = 1
  } finally {
    try {
      if (payload && typeof payload.destroy === 'function') await payload.destroy()
    } catch (e) {}
  }
}

main()
