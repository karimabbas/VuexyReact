import api from '../../../../../@core/util/api'

export const getEmployeeList = () => {
  return async dispatch => {
    dispatch({
      type: 'REFRESH_PERMISSION'
    })
    api().get('employee_auto_complete').then(response => {
      const data = response.data
      dispatch({
        type: 'SET_EMPLOYEE_LIST',
        employeeList: data
      })
    })
  }
}
export const getData = (data) => {
  return async dispatch => {
    console.log(data)
    dispatch({
      type: 'FilterData',
      currentFilter: data
    })
  }
}
export const getEmployeePermissions = (data, currentFilter) => {
  return async dispatch => {
    api().post('getPermissions', data).then(response => {
      const data = response.data
      dispatch({
        type: 'SET_ALL_DATA_EMPLOYEE_PERMISSIONS',
        data: data.permissions,
        headers: data.roles,
        currentFilter
      })
    })
  }
}
export const triggerPermission = (employee, permission, currentFilter) => {
  return async dispatch => {
    dispatch({ type: 'SET_LOADING_PERMISSIONS' })
    await api().post('store_permissions', { employee, permission }).then(response => {
      const data = response.data
      dispatch({
        type: 'SET_ALL_DATA_EMPLOYEE_PERMISSIONS',
        data: data.permissions,
        headers: data.roles,
        currentFilter
      })
    })
  }
}