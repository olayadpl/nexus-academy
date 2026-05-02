import payload from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

async function main() {
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret-change-me'
  const dbUrl = process.env.DATABASE_URL || 'file:./payload.db'

  const adminsCollection = {
    slug: 'admins',
    auth: true,
    admin: { useAsTitle: 'email' },
    access: {
      read: () => false,
    },
    fields: [
      { name: 'email', type: 'email', required: true },
      { name: 'name', type: 'text' },
      { name: 'password', type: 'password', required: true },
    ],
  }

  const config = buildConfig({
    secret,
    collections: [adminsCollection],
    db: sqliteAdapter({ client: { url: dbUrl } }),
  })

  await payload.init({ secret, config })

  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'changeme'
  const name = process.env.ADMIN_NAME || 'Admin'

  console.log('Creating admin', email)

  try {
    await payload.create({
      collection: 'admins',
      data: { email, password, name },
      overrideAccess: true,
    })
    console.log('Admin created')
  } catch (err) {
    console.error('Error creating admin:', err)
  } finally {
    try {
      if (payload && typeof payload.destroy === 'function') await payload.destroy()
    } catch (e) {
      // ignore
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
