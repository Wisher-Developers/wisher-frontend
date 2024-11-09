export default function getPeopleCase(count: number) {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if ((lastTwoDigits > 10 && lastTwoDigits < 20) || lastDigit === 1) {
    return "человек"
  }

  if (lastDigit > 1 && lastDigit < 5) {
    return "человека"
  }

  if (lastDigit === 0 || lastDigit > 4) {
    return "человек"
  }
}
