// ** React Imports
import { Fragment, useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AlertCircle } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Custom Hooks
import { useOnClickOutside } from '@hooks/useOnClickOutside'

// ** Styles
import '@styles/base/bootstrap-extended/_include.scss'
import './autocompleteMain.scss'

const AutocompleteMain = props => {
  // ** Refs
  const containerMain = useRef(null)
  const inputElRef = useRef(null)
  const suggestionsListRef = useRef(null)

  // ** States
  const [focused, setFocused] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState(props.value ? props.value : '')
  const [debouncedTerm, setDebouncedTerm] = useState(userInput)

  // ** Vars
  const history = useHistory()
  let filteredData = []

  useEffect(() => {
    const timer = setTimeout(() => setUserInput(debouncedTerm), 200)
    return () => clearTimeout(timer)
  }, [debouncedTerm])

  useEffect(() => {
    if (userInput !== '') {
      props.onSearchSubmit(userInput)
    } else {
      props.clearResults()
    }
  }, [userInput])

  // ** Suggestion Item Click Event
  const onSuggestionItemClick = (url, e) => {
    setActiveSuggestion(0)
    setShowSuggestions(false)
    setDebouncedTerm(filteredData[activeSuggestion][props.filterKey])
    if (url !== undefined && url !== null) {
      history.push(url)
    }

    if (props.onSuggestionClick) {
      props.onSuggestionClick(url, e)
    }
  }

  // ** Suggestion Hover Event
  const onSuggestionItemHover = index => {
    setActiveSuggestion(index)
  }

  // ** Input On Change Event
  const onChange = e => {
    const userInput = e.currentTarget.value
    setActiveSuggestion(0)
    setShowSuggestions(true)
    setDebouncedTerm(userInput)
    if (e.target.value < 1) {
      setShowSuggestions(false)
    }
  }

  // ** Input Click Event
  const onInputClick = e => {
    e.stopPropagation()
  }

  // ** Input's Keydown Event
  const onKeyDown = e => {
    const filterKey = props.filterKey
    const suggestionList = ReactDOM.findDOMNode(suggestionsListRef.current)

    // ** User pressed the up arrow
    if (e.keyCode === 38 && activeSuggestion !== 0) {
      setActiveSuggestion(activeSuggestion - 1)

      if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= filteredData.length / 2) {
        suggestionList.scrollTop = 0
      }
    } else if (e.keyCode === 40 && activeSuggestion < filteredData.length - 1) {
      // ** User pressed the down arrow
      setActiveSuggestion(activeSuggestion + 1)

      if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= filteredData.length / 2) {
        suggestionList.scrollTop = suggestionList.scrollHeight
      }
    } else if (e.keyCode === 27) {
      // ** User Pressed ESC
      setShowSuggestions(false)
      setDebouncedTerm('')
    } else if (e.keyCode === 13 && showSuggestions) {
      // ** User Pressed ENTER
      onSuggestionItemClick(filteredData[activeSuggestion].link, e)
      setDebouncedTerm(filteredData[activeSuggestion][filterKey])
      setShowSuggestions(false)
    } else {
      return
    }

    // ** Custom Keydown Event
    if (props.onKeyDown !== undefined && props.onKeyDown !== null) {
      props.onKeyDown(e, userInput)
    }
  }

  // ** Function To Render Grouped Suggestions
  const renderGroupedSuggestion = arr => {
    const { filterKey, customRender } = props

    const renderSuggestion = (item, i) => {
      if (!customRender) {
        const suggestionURL = item.link !== undefined && item.link !== null ? item.link : null
        return (
          <li
            className={classnames('suggestion-item', {
              active: filteredData.indexOf(item) === activeSuggestion
            })}
            key={item[filterKey]}
            onClick={e => onSuggestionItemClick(suggestionURL, e)}
            onMouseEnter={() => {
              //onSuggestionItemHover(filteredData.indexOf(item))
            }}
          >
            {item[filterKey]}
          </li>
        )
      } else if (customRender) {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          onSuggestionItemClick,
          onSuggestionItemHover,
          userInput
        )
      } else {
        return null
      }
    }

    return arr.map((item, i) => {
      return renderSuggestion(item, i)
    })
  }

  // ** Function To Render Ungrouped Suggestions
  const renderUngroupedSuggestions = () => {
    const { filterKey, suggestions, customRender, suggestionLimit } = props
    filteredData = []
    const sortSingleData = suggestions
      .filter(i => {
        const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
          includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase())
        if (startCondition) {
          return startCondition
        } else if (!startCondition && includeCondition) {
          return includeCondition
        } else {
          return null
        }
      })
      .slice(0, suggestionLimit)
    filteredData.push(...sortSingleData)
    if (sortSingleData.length) {
      return sortSingleData.map((suggestion, index) => {
        const suggestionURL = suggestion.link !== undefined && suggestion.link !== null ? suggestion.link : null
        if (!customRender) {
          return (
            <li
              className={classnames('suggestion-item', {
                active: filteredData.indexOf(suggestion) === activeSuggestion
              })}
              key={suggestion[filterKey]}
              onClick={e => onSuggestionItemClick(suggestionURL, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(suggestion))}
            >
              {suggestion[filterKey]}
            </li>
          )
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          )
        } else {
          return null
        }
      })
    } else {
      return (
        <li className='suggestion-item no-result d-flex justify-content-center align-items-center'>
          <AlertCircle size={15} /> <span className='align-middle ml-50'>لا يوجد نتائج</span>
        </li>
      )
    }
  }

  // ** Function To Render Suggestions
  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions, loading } = props
    if (loading) {
      return (
        <li className='suggestion-item no-result d-flex justify-content-center align-items-center'>
          <AlertCircle size={15} /> <span className='align-middle ml-50'>الرجاء الانتظار...</span>
        </li>
      )
    }
    // ** Checks if suggestions are grouped or not.
    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions()
    } else {
      filteredData = []
      const sortData = suggestions
        .filter(i => {
          const startCondition = i[filterKey]?.toLowerCase()?.startsWith(userInput?.toLowerCase()),
            includeCondition = i[filterKey]?.toLowerCase()?.includes(userInput?.toLowerCase())
          if (startCondition) {
            return startCondition
          } else if (!startCondition && includeCondition) {
            return includeCondition
          } else {
            return null
          }
        })
        .slice(0, suggestions.searchLimit)

      filteredData.push(...sortData)
      return (
        <Fragment key={suggestions[filterHeaderKey]}>
          {sortData.length ? (
            renderGroupedSuggestion(sortData)
          ) : (
            <li className='suggestion-item no-result d-flex justify-content-center align-items-center'>
              <AlertCircle size={15} /> <span className='align-middle ml-50'>لا يوجد نتائج</span>
            </li>
          )}
        </Fragment>
      )
      // })
    }
  }

  //** ComponentDidMount
  useEffect(() => {
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }
  }, [focused, props.defaultSuggestions])

  //** ComponentDidUpdate
  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current)

    // ** For searchbar focus
    if (textInput !== null && props.autoFocus) {
      inputElRef.current.focus()
    }

    // ** If user has passed default suggestions & focus then show default suggestions
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }

    // ** Function to run on user passed Clear Input
    if (props.clearInput) {
      props.clearInput(userInput, setDebouncedTerm)
    }

    // ** Function on Suggestions Shown
    if (props.onSuggestionsShown && showSuggestions) {
      props.onSuggestionsShown(userInput)
    }
  }, [setShowSuggestions, focused, userInput, showSuggestions, props])

  // ** On External Click Close The Search & Call Passed Function
  useOnClickOutside(containerMain, () => {
    setShowSuggestions(false)
    if (props.externalClick) {
      props.externalClick()
    }
  })

  let suggestionsListComponent

  if (showSuggestions) {
    suggestionsListComponent = (
      <PerfectScrollbar
        className={classnames('suggestions-list-navbar', {
          [props.wrapperClass]: props.wrapperClass
        })}
        ref={suggestionsListRef}
        component='ul'
        options={{ wheelPropagation: false }}
      >
        {renderSuggestions()}
      </PerfectScrollbar>
    )
  }

  return (
    <div className='autocomplete-container' ref={containerMain}>
      <input
        type='text'
        id='search-main'
        name='search-main'
        onChange={e => {
          onChange(e)
          if (props.onChange) {
            props.onChange(e)
          }
        }}
        onKeyDown={e => onKeyDown(e)}
        value={debouncedTerm}
        className={`autocomplete-search search-radius ${props.className ? props.className : ''}`}
        placeholder={props.placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        onFocus={e => setFocused(true)}
        autoFocus={props.autoFocus}
        onBlur={e => {
          if (props.onBlur) props.onBlur(e)
          setFocused(false)
        }}
      />
      {suggestionsListComponent}
    </div>
  )
}

export default AutocompleteMain

// ** PropTypes
AutocompleteMain.propTypes = {
  suggestions: PropTypes.array.isRequired,
  filterKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  wrapperClass: PropTypes.string,
  filterHeaderKey: PropTypes.string,
  placeholder: PropTypes.string,
  suggestionLimit: PropTypes.number,
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func,
  clearInput: PropTypes.func,
  externalClick: PropTypes.func
}