import api from '../../../../../@core/util/api'

export const getExpandPermissions = () => {
  return async dispatch => {
    api().post('getExpandPermissions').then(response => {
      const data = response.data
      dispatch({
        type: 'SET_EXPAND_PERMISSION_LIST',
        data: data.permissions,
        headers: data.roles
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

export const triggerPermission = (permission, currentFilter) => {
  return async dispatch => {
    dispatch({ type: 'SET_LOADING_PERMISSIONS' })
    await api().post('trigger_permissions_expand', { permission }).then(response => {
      const data = response.data
      dispatch({
        type: 'SET_EXPAND_PERMISSION_LIST',
        data: data.permissions,
        headers: data.roles,
        currentFilter
      })
    })
  }
}