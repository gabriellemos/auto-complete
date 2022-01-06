import * as Utils from 'utils'

test('Check full string highlight', () => {
  const result = Utils.highlightText('The Amazing Spider-Man', 'The Amazing Spider-Man')
  expect(result).toBe('<span class="highlight">The Amazing Spider-Man</span>')
})

test('Check partial string highlight (case sensitive)', () => {
  const result = Utils.highlightText('The Amazing Spider-Man', 'Amazing')
  expect(result).toBe('The <span class="highlight">Amazing</span> Spider-Man')
})

test('Check partial string highlight (case insensitive)', () => {
  const result = Utils.highlightText('The Amazing Spider-Man', 'AMAZING')
  expect(result).toBe('The <span class="highlight">AMAZING</span> Spider-Man')
})

test('Check no string highlight', () => {
  const result = Utils.highlightText('The Amazing Spider-Man', 'Marvel')
  expect(result).toBe('The Amazing Spider-Man')
})

test('Check filter (case sensitive)', () => {
  const movieList = [{ title: "The Matrix" }, { title: "The Amazing Spider-Man" }]
  const result = Utils.filterMovieTitle(movieList, 'The')
  expect(new Set(result)).toEqual(new Set(movieList))
})

test('Check filter (case insensitive)', () => {
  const movieList = [{ title: "The Matrix" }, { title: "The Amazing Spider-Man" }]
  const result = Utils.filterMovieTitle(movieList, 'MATRIX')
  expect(new Set(result)).toEqual(new Set([movieList[0]]))
})

test('Check filter with no match', () => {
  const movieList = [{ title: "The Matrix" }, { title: "The Amazing Spider-Man" }]
  const result = Utils.filterMovieTitle(movieList, 'Marvel')
  expect(result.length).toEqual(0)
})
