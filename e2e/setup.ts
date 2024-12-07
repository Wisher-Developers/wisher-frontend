export default function setup() {
  const currentTimestamp = Date.now()

  process.env.username = `test_user_${currentTimestamp}`
  process.env.email = `test@${currentTimestamp}`
  process.env.password = "test_password"
}
