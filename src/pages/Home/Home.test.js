import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from 'pages/Home'
import * as MoviesService from 'services/Movies'

const SAMPLE_RESPONSE = {
  data: {
    results: [
      { id: 1, title: 'The Matrix' },
      { id: 2, title: 'The Amazing Spider-Man' }
    ]
  }
}

describe("Auto complete test", () => {
  test('initial value should be an empty string', () => {
    render(<Home />)
    const input = screen.getByRole('textbox')
    expect(input.getAttribute('value')).toBe('')
  })
})

test('typing multiple characters should trigger a single HTTP request', async () => {
  jest.spyOn(MoviesService, 'search').mockResolvedValueOnce(SAMPLE_RESPONSE)

  render(<Home />)
  const input = screen.getByRole('textbox')
  userEvent.type(input, 'The')

  expect(input.getAttribute('value')).toBe('The')
  expect(MoviesService.search).toBeCalledTimes(0)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  expect(MoviesService.search).toBeCalledTimes(1)
})

test('updating search query will trigger a filter on the current results', async () => {
  jest.spyOn(MoviesService, 'search').mockResolvedValueOnce(SAMPLE_RESPONSE)

  render(<Home />)
  const input = screen.getByRole('textbox')
  userEvent.type(input, 'The')

  // Awaiting time so the results are fetched from API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  expect(screen.getAllByRole('link').length).toBe(2)
  expect(MoviesService.search).toBeCalledTimes(1)

  userEvent.clear(input)
  userEvent.type(input, 'Amazing')

  expect(screen.getAllByRole('link').length).toBe(1)
})
