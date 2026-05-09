import payload from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

async function main() {
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret-change-me'
  const dbUrl = process.env.DATABASE_URL || 'file:./payload.db'

  // Use generated collections so schema matches code
  const { featureCollections } = await import('../src/payload-collections.generated.js').catch(async () => {
    // try TS path
    return await import('../src/payload-collections.generated.ts')
  })

  const config = buildConfig({
    secret,
    collections: featureCollections,
    db: sqliteAdapter({ client: { url: dbUrl } }),
  })

  await payload.init({ secret, config })

  const email = process.env.ADMIN_EMAIL || 'olayadpl@gmail.com'
  const newPassword = process.env.NEW_ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64').replace(/\/+|\+/g, '_').slice(0, 16)

  // find admin
  const admins = await payload.find({ collection: 'admins', where: { email: { equals: email } }, limit: 1 })
  if (!admins || !admins.docs || admins.docs.length === 0) {
    console.error('No admin found with email', email)
    await payload.destroy()
    process.exit(1)
  }

  const admin = admins.docs[0]

  // Update password using payload so it handles hashing
  await payload.update({ collection: 'admins', id: admin.id, data: { password: newPassword }, overrideAccess: true })

  console.log('Updated admin password for', email)
  console.log('New password:', newPassword)

  await payload.destroy()
}

main().catch(async (err) => {
  console.error(err)
  try { await payload?.destroy() } catch (e) {}
  process.exit(1)
})
