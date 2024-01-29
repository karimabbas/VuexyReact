// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
// ** Custom Components
import Autocomplete from './autocomplete'
import api from '@src/@core/util/api'

const CustomSearch = (props) => {
  // ** Store Vars
  const [suggestions, setSuggestions] = useState([])
  const [debouncedTerm, setDebouncedTerm] = useState('')
  // const [term, setTerm] = useState('')
  const [navbarSearch, setNavbarSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const requestSearchQuery = (async val => {
    const res = await api().get(`search_auto_complete?str=${val}`)
    if (res.status !== 200) return []
    const arraySuggestions = await res.data
    return arraySuggestions
  })
  const handleSearchQuery = (val) => {
    if (val === '') {
      setSuggestions([])
      setLoading(false)
      setDebouncedTerm('')
    } else {
      setDebouncedTerm(val)
    }
  }

  const onSearchSubmit = useCallback(async term => {
    setLoading(true)
    handleSearchQuery(term)
    const data = await requestSearchQuery(term.toLowerCase())
    setSuggestions(data)
    setLoading(false)
  })

  // ** Removes query in store
  const handleClearQueryInStore = () => handleSearchQuery('')

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
      // handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    // if (!navbarSearch) {
    //   setUserInput('')
    //   handleClearQueryInStore()
    // }
  }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false)
        // handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    // handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (item) => {
    // console.log(item)
    props.onClick(item)
  }
  return (
    <div
      className={classnames('search-input', {
        open: navbarSearch === true
      })}
      style={{ width: '300px' }}
    >
      <Autocomplete
        className='form-control text-center'
        suggestions={suggestions}
        filterKey='name_type'
        filterHeaderKey='groupTitle'
        placeholder='ابحث...'
        autoFocus={false}
        value={props?.defaultValue}
        clearResults={handleClearQueryInStore}
        onSearchSubmit={onSearchSubmit}
        name='aa'
        id='aawee'
        handleListItemClick={handleListItemClick}
        loading={loading}
        onSuggestionItemClick={handleSuggestionItemClick}
        externalClick={handleExternalClick}
        clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
        onKeyDown={onKeyDown}
        onChange={e => setDebouncedTerm(e.target.value)}
      />
    </div>
  )
}

export default CustomSearch
