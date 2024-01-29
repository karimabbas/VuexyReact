// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

// ** Custom Components
import Autocomplete from '@components/autocomplete/AutoCompleteMain'
import api from '../../../util/api'
import { requestSearchQuery } from './apiAutoComplete'

const CustomNavbarSearchMain = () => {
  // ** Store Vars
  const [suggestions, setSuggestions] = useState([])
  const [debouncedTerm, setDebouncedTerm] = useState('')
  // const [term, setTerm] = useState('')
  const [navbarSearch, setNavbarSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSearchQuery = (val) => {
    if (val === '') {
      setSuggestions([])
      setLoading(false)
      setDebouncedTerm('')
    } else {
      setDebouncedTerm(val)
      // api().post('archive_auto_complete', { str: val }).then((res) => {
      //   setSuggestions(res.data)
      //   setLoading(false)
      // })
    }
  }
  // useEffect(() => {
  //   setLoading(true)
  //   // const timer = setTimeout(() => {
  //   handleSearchQuery(debouncedTerm)
  //   // }, 200)
  //   // return () => clearTimeout(timer)
  //   return () => {
  //     setSuggestions([])
  //   }
  // }, [debouncedTerm])

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
      handleClearQueryInStore()
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
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
    handleClearQueryInStore()
  }
  return (
    <div
      className={classnames('search-input', {
        open: navbarSearch === true
      })}
      style={{ width: '600px' }}
    >
      <Autocomplete
        className='form-control text-center'
        suggestions={suggestions}
        filterKey='name_type'
        filterHeaderKey='groupTitle'
        grouped={true}
        placeholder='ابحث...'
        autoFocus={false}
        clearResults={handleClearQueryInStore}
        onSearchSubmit={onSearchSubmit}
        name='aa'
        id='aawee'
        loading={loading}
        onSuggestionItemClick={handleSuggestionItemClick}
        externalClick={handleExternalClick}
        clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
        onKeyDown={onKeyDown}
        onChange={e => setDebouncedTerm(e.target.value)}
        customRender={(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
          const IconTag = Icon[item.icon ? item.icon : 'X']
          return (
            <li
              className={classnames('suggestion-item', {
                active: filteredData.indexOf(item) === activeSuggestion
              })}
              key={i}
              onClick={e => handleListItemClick(onSuggestionItemClick, item.url_edit, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
            >
              <div
                className={'d-flex justify-content-center align-items-center'}
              >
                <div className='item-container d-flex'>
                  <div className='item-info ml-1'>
                    <p className='align-center mb-0'>{item.name_type}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      />
    </div>
  )
}

export default CustomNavbarSearchMain
