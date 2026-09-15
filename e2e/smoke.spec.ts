import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page loads and has no obvious accessibility violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('component doc page renders MDX body and a live preview', async ({ page }) => {
  await page.goto('/components/button')
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'When to use' })).toBeVisible()
  await expect(page.getByRole('tablist', { name: 'Button documentation' })).toBeVisible()
})
