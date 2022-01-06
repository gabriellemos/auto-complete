import React, { useState, useEffect } from 'react'

import Autocomplete from 'components/Autocomplete'
import * as MoviesService from 'services/Movies'

const Home = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(false)

  const requestMovies = async () => {
    try {
      setLoading(true)
      const result = await MoviesService.search(query)
      setMovies(result.data.results)
    } catch {
      setMovies([])
    }
    setLoading(false)
  }

  useEffect(() => {
    let idTimeout
    if (query) {
      // Timeout to avoid sending multiple unecessary request while typing.
      idTimeout = setTimeout(requestMovies, 1000)
    }
    return () => {
      if (idTimeout) {
        clearTimeout(idTimeout)
      }
    }
  }, [query])

  return (
    <Autocomplete
      value={query}
      setValue={setQuery}
      options={movies}
      loading={isLoading}
    />
  )
}

export default Home
