// ** React Imports
import { useEffect, useState, useCallback } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleSearchQuery, setSuggestions } from '@store/actions/navbar'
import { requestSearchQuery } from './apiAutoComplete'
// ** Custom Components
import Autocomplete from '@components/autocomplete'

const CustomNavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navbarReducer = useSelector(state => state.navbar)
  const suggestions = navbarReducer.suggestions
  // const [debouncedTerm, setDebouncedTerm] = useState(navbarReducer.query)
  const [navbarSearch, setNavbarSearch] = useState(false)
  // ** ComponentDidMount

  const onSearchSubmit = useCallback(async term => {
    dispatch({
      type: 'HANDLE_SET_LOADING_NAVBAR',
      loading: true
    })
    if (navbarReducer.query.length === 0) {
      dispatch({
        type: 'HANDLE_SET_LOADING_NAVBAR',
        loading: true
      })
      // dispatch(setSuggestions([]))
      // dispatch(handleSearchQuery(''))
    }
    dispatch(handleSearchQuery(term))
    const data = await requestSearchQuery(term.toLowerCase())
    dispatch(setSuggestions(data))
  })
  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!navbarSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = e => {
    console.log(e)
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
    <NavItem className='nav-search' onClick={() => setNavbarSearch(true)}>
      <NavLink className='nav-link-search d-flex justify-content-center'>
        <Icon.Search className='ficon' />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch === true
        })}
      >
        {/* <div className='search-input-icon'>
          <Icon.Search />
        </div> */}
        {navbarSearch ? (
          <Autocomplete
            className='form-control text-center'
            suggestions={suggestions}
            filterKey='name_type'
            filterHeaderKey='groupTitle'
            grouped={true}
            placeholder='ابحث...'
            autoFocus={true}
            clearResults={handleClearQueryInStore}
            onSearchSubmit={onSearchSubmit}
            loading={navbarReducer.loading}
            onSuggestionItemClick={handleSuggestionItemClick}
            externalClick={handleExternalClick}
            clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
            onKeyDown={onKeyDown}
            onChange={e => e.preventDefault()}
            customRender={(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
              const IconTag = Icon[item.icon ? item.icon : 'X']
              return (
                <li
                  className={classnames('suggestion-item', {
                    active: filteredData.indexOf(item) === activeSuggestion
                  })}
                  key={i}
                  onClick={e => handleListItemClick(onSuggestionItemClick, item.url_edit.toLowerCase(), e)}
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
        ) : null}
        <div className='search-input-close'>
          <Icon.X
            className='ficon'
            onClick={e => {
              e.stopPropagation()
              setNavbarSearch(false)
              handleClearQueryInStore()
            }}
          />
        </div>
      </div>
    </NavItem>
  )
}

export default CustomNavbarSearch
