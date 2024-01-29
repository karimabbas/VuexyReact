const initialState = {
  allData: [],
  headers: [],
  data: [],
  filteredData: [],
  loading: true,
  employeeList: []
}
const employeePermissions = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_DATA_EMPLOYEE_PERMISSIONS':
      const data = action.data
      const headers = action?.headers?.map(item => {
        return { ...item, label: item.title, value: item.title }
      })
      let filtered = data
      if (action.currentFilter?.value) {
        filtered = filtered.filter(item => item.parent_id === action.currentFilter.parent)
      }
      return { ...state, headers, data, filteredData: filtered, loading: false }
    case 'FilterData':
      let filteredData = state.data
      if (action.currentFilter?.value) {
        filteredData = filteredData.filter(item => item.parent_id === action.currentFilter.parent)
      }
      return { ...state, filteredData }
    case 'SET_EMPLOYEE_LIST':
      return {
        ...initialState,
        employeeList: action.employeeList,
        loading: false
      }
    case 'SET_LOADING_PERMISSIONS':
      return {
        ...state,
        loading: true
      }
    case 'REFRESH_PERMISSION':
      return {
        ...initialState
      }
    default:
      return { ...state }
  }
}
export default employeePermissions
