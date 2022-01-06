/**
 * Receives a text and highlight part of it with <span> tag. If nothing needs
 * to be highlighted, the original text is returned. Highlight is case
 * insensitive.
 *
 * @param {String} text
 * @param {String} highlight
 * @returns Text with highlighted area or original text.
 */
export const highlightText = (text, highlight) => {
  return text
    .split(new RegExp(highlight, 'ig'))
    .join(`<span class="highlight">${highlight}</span>`)
}

/**
 * Filter a list of movies based on the movie title. Filtering function is case
 * insensitive.
 *
 * @param {Array} list
 * @param {String} text
 * @returns Filtered list of movies.
 */
export const filterMovieTitle = (list, text) => {
  return list.filter((movie) => {
    return movie?.title?.match(new RegExp(text, 'i'))
  })
}
