import { test, expect } from '@playwright/test'

test.describe('1. User registration', () => {
  test('1.1 Register a new user using name and password option and find its email on the main page', async ({ page }) => {
    const randomUserName = Math.random().toString(32).substring(2) + '@wp.pl'

    await page.goto('http://localhost:5173/')
    await page.locator('[data-test="register-link"]').click()
    await page.locator('[data-test="email-input"]').fill(randomUserName)
    await page.locator('[data-test="password-input"]').fill('123456')
    await page.locator('[data-test="submit-button"]').click()

    await expect(page.locator('[data-test="logged-user"]')).toHaveText(randomUserName)
  })
})

test.describe('2. Cards type', () => {
  test('2.1 Change "People" set of cards into "Starships" and find "Weight" label replaced by "Crew" in the body of cards', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.locator('[data-test="starships-radio"]').click()

    await expect(page.locator('[data-test="card-attribute"]').first()).toHaveText('Crew')
    await expect(page.locator('[data-test="card-attribute"]').nth(1)).toHaveText('Crew')
  })

  test('2.2 Change "Starships" set of cards into "People" and find "Crew" label replaced by "Weight" in the body of cards', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.locator('[data-test="starships-radio"]').click()

    await page.waitForTimeout(1000)
    await page.locator('[data-test="people-radio"]').click()

    await expect(page.locator('[data-test="card-attribute"]').first()).toHaveText('Weight')
    await expect(page.locator('[data-test="card-attribute"]').nth(1)).toHaveText('Weight')
  })
})

test.describe('3. Reset', () => {
  test('3.1 Click "Reset" button and find zeroes as results and blank cards', async ({ page }) => {
    await page.goto('http://localhost:5173/')

    await page.locator('[data-test="reset-button"]').waitFor()
    await page.locator('[data-test="reset-button"]').click()

    await expect(page.locator('[data-test="player-one-score"]')).toHaveText('0')
    await expect(page.locator('[data-test="player-two-score"]')).toHaveText('0')

    await expect(page.locator('[data-test="card-name"]').first()).toBeEmpty()
    await expect(page.locator('[data-test="card-name"]').nth(1)).toBeEmpty()

    await expect(page.locator('[data-test="card-value"]').first()).toBeEmpty()
    await expect(page.locator('[data-test="card-value"]').nth(1)).toBeEmpty()

    await expect(page.locator('[data-test="card-attribute"]').first()).toBeEmpty()
    await expect(page.locator('[data-test="card-attribute"]').nth(1)).toBeEmpty()
  })
})

test.describe('4. Game result', () => {
  test('4.1 Click "Reset" then "Go" button and find game result for each player (loop of 5)',
    async ({ page }) => {
      await page.goto('http://localhost:5173/')

      for (let i = 0; i < 5; i++) {
        await page.waitForTimeout(500)
        await page.locator('[data-test="reset-button"]').click()

        /*
           Below commented code is not deleted for debugging purposes, if the test is flaky

           console.log('\n------ i = ', i, ' ------')

           const playerOneScoreStart = await page.locator('[data-test="player-one-score"]').textContent()
           console.log('playerOneScoreStart = ', playerOneScoreStart)

           const playerTwoScoreStart = await page.locator('[data-test="player-two-score"]').textContent()
           console.log('playerTwoScoreStart = ', playerTwoScoreStart)
        */

        await page.locator('[data-test="go-button"]').click()
        await page.waitForTimeout(1000)

        const playerOneCardValue = await page.locator('[data-test="card-value"]').first().textContent()
        const playerTwoCardValue = await page.locator('[data-test="card-value"]').nth(1).textContent()

        /*
           Below commented code is not deleted for debugging purposes, if the test is flaky

           console.log('playerOneCardValue = ', playerOneCardValue)
           console.log('playerTwoCardValue = ', playerTwoCardValue)

           const playerOneScoreEnd = await page.locator('[data-test="player-one-score"]').textContent()
           console.log('playerOneScoreEnd = ', playerOneScoreEnd)

           const playerTwoScoreEnd = await page.locator('[data-test="player-two-score"]').textContent()
           console.log('playerTwoScoreEnd = ', playerTwoScoreEnd)
        */

        if (playerOneCardValue > playerTwoCardValue) {
          await expect(page.locator('[data-test="player-one-score"]')).toHaveText('1')
          await expect(page.locator('[data-test="player-two-score"]')).toHaveText('0')
        }
        else {
          await expect(page.locator('[data-test="player-one-score"]')).toHaveText('0')
          await expect(page.locator('[data-test="player-two-score"]')).toHaveText('1')
        }
      }
    })
})
