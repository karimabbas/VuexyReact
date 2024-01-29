const initialState = {
  data: [],
  columns: [],
  loading: true,
  config: {
    archiveTypeApi: '',
    url: '',
    title: '',
    dataTableTitle: '',
    employeeShareList: []
  },
  selectedArchive: null,
  attachments: {
    localAttachments: [],
    serverAttachments: []
  },
  auto_complete_models: [],
  filteredAutoComplete: [],
  vehicle_auto_complete: [],
  employeeList: [],
  errors: false
}
const archives = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ARCHIVE':
      return { ...state, ...action }
    case 'GET_ARCHIVE':
      return { ...state, selectedArchive: action.selectedArchive }
    case 'GET_ALL_ARCHIVE_DEPENDS':
      const configAction = { ...state.config, ...action.config }
      return { ...state, ...action, config: configAction }
    case 'FilteredAutoComplete':
      const autoComplete = state.auto_complete_models
      const filtered = autoComplete.filter((item) => {
        return item.model === action.model
      })
      return { ...state, filteredAutoComplete: filtered }
    case 'SET_ARCHIVE':
      return { ...state, selectedArchive: action.selectedArchive }
    case 'ADD_EMPLOYEE':
      return { ...state, employeeList: action.employeeList }
    case 'ADD_EMPLOYEE_SHARE':
      const stateConfig = state.config
      return { ...state, config: { ...stateConfig, employeeShareList: action.employeeShareList } }
    case 'ADD_ARCHIVE':
      let data = state.data
      const item = action.item
      const index = data.findIndex(itemData => itemData.id === item.id)
      if (index >= 0) {
        data[index] = item
      } else {
        data.unshift(item)
        data = data.map((item, index) => {
          return { ...item, rowId: index + 1 }
        })
      }
      return { ...state, errors: false, data }
    case 'DELETE_ARCHIVE':
      const updatedData = state.data.filter(item => item.id !== action.id)
      return { ...state, data: updatedData }
    case 'SET_FILES':
      return { ...state, attachments: action.attachments }
    case 'UNSET_FILES':
      return {
        ...state,
        attachments: {
          localAttachments: [],
          serverAttachments: []
        }
      }
    case 'SET_LOADING':
      return { ...state, loading: false }
    case 'UNSET_LOADING':
      return { ...state, loading: false }
    case 'SET_ARCHIVE_ERROR':
      return { ...state, errors: action.errors }
    default:
      return { ...state }
  }
}
export default archives
