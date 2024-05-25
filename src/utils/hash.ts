import * as argon2 from 'argon2'

export async function hashPassword(password: string): Promise<string> {
  try {
    const passwordHash = await argon2.hash(password)
    return passwordHash
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export async function verifyPassword(
  passwordHash: string,
  testingPassword: string,
): Promise<boolean> {
  try {
    const isValidPassword = await argon2.verify(passwordHash, testingPassword)
    return isValidPassword
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
