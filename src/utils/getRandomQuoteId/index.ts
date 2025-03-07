export function getRandomQuoteId(arrLength: number) {
  let randomQuoteId = Math.floor(Math.random() * (arrLength + 1))
  if (randomQuoteId === arrLength) {
    randomQuoteId--
  } else if (randomQuoteId > arrLength) {
    // If Math.random() === 1
    randomQuoteId -= 2
  }
  return randomQuoteId
}