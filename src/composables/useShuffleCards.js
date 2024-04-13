export function useShuffleCards(peopleNumber) {
  const cardNumbersRange = (start, stop, step) => Array.from( { length: (stop - start) / step + 1 }, (value, index) => start + index * step );

  const shuffledCardNumbers = cardNumbersRange(0, peopleNumber - 1, 1)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffledCardNumbers
}
