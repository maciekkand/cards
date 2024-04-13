import { expect, test, describe } from 'vitest'
import { useShuffleCards }  from '../composables/useShuffleCards'

describe('shuffleCards', () => {
  test('should return a random array of numbers (0 to 9); requires array length', () => {
    const rangeArrayString = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].toString()

    const randomArray = useShuffleCards(10)
    const randomArrayString = randomArray.toString()

    expect(randomArray.length).toBe(10)
    expect(randomArrayString).not.toEqual(rangeArrayString)
  })
})
