import _ from 'lodash'
import api from '../../../util/api'

export const requestSearchQuery = (async val => {
    const res = await api().get(`search_auto_complete?str=${val}`)
    if (res.status !== 200) return []
    const arraySuggestions = await res.data
    return arraySuggestions
})