import React, { useState, useEffect } from 'react'

import { Input } from 'components/Input'
import * as Styles from 'components/Autocomplete/Styles'

import * as Utils from 'utils'

const Autocomplete = ({
  id,
  value,
  setValue,
  options: originalOptions,
  loading,
  ...props
}) => {
  const [hasFocus, setFocus] = useState(false)
  const [options, setOptions] = useState(originalOptions)

  useEffect(() => {
    if (!value) {
      setOptions([])
    } else {
      setOptions(Utils.filterMovieTitle(originalOptions, value))
    }
  }, [value, originalOptions])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleFocus = (hasFocus) => {
    if (hasFocus) {
      setFocus(true)
    } else {
      // It is necessary to set some timout so the click event can be registered
      // when the user clicks on any suggestion from the autocomplete component.
      setTimeout(() => setFocus(false), 100)
    }
  }

  const configureHighlight = (text) => {
    return Utils.highlightText(text, value)
  }

  return (
    <Styles.Container isLoading={loading} {...props}>
      <Input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
      {loading && (
        <span className="loading rotating material-icons">refresh</span>
      )}
      {options.length > 0 && hasFocus && (
        <div className="suggestion">
          {options.map((option) => {
            return (
              <div key={option.id} className="suggestion__item">
                <a
                  href="#"
                  id={option.id}
                  onClick={() => {
                    setValue(option.title)
                    setFocus(false)
                  }}
                  dangerouslySetInnerHTML={{
                    __html: configureHighlight(option.title)
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </Styles.Container>
  )
}

export default Autocomplete
