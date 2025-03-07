export function getRandomAuthorId() {
  let randomId = Math.floor(Math.random() * 3) + 1
  if (randomId === 4) {
    randomId = 3
  }
  return randomId
}