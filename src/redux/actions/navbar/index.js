import axios from 'axios'
import api from '../../../@core/util/api'

// ** Get Bookmarks Array from @fakeDB
export const getBookmarks = () => {
  return dispatch => {
    return axios.get('/api/bookmarks/data').then(response => {
      dispatch({
        type: 'GET_BOOKMARKS',
        bookmarks: response.data.bookmarks
      })
    })
  }
}

// ** Update & Get Updated Bookmarks Array
export const updateBookmarked = id => {
  return dispatch => {
    return axios.post('/api/bookmarks/update', { id }).then(() => {
      dispatch({ type: 'UPDATE_BOOKMARKED', id })
    })
  }
}

// ** Handle Bookmarks & Main Search Queries

export const handleSearchQuery = val => async dispatch => {
  return dispatch({
    type: 'HANDLE_SEARCH_QUERY',
    val
  })
}
export const handleApiSearchQuery = val => async dispatch => {
  if (val === '') {
    dispatch({
      type: 'HANDLE_SEARCH_QUERY_API',
      val,
      suggestions: []
    })
  } else {
    api().get(`search_auto_complete?str=${val}`).then((res) => {
      dispatch({
        type: 'HANDLE_SEARCH_QUERY_API',
        val,
        suggestions: res.data
      })
    })
  }
}
export const setSuggestions = (data) => {
  return dispatch => {
    dispatch({
      type: 'HANDLE_SET_SUGGESTIONS_NAVBAR',
      suggestions: data
    })
  }
}
