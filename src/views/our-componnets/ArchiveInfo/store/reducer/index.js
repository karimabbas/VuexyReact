const initialState = {
  tabs: {
    outArchive: {
      data: [],
      columns: []
    },
    inArchive: {
      data: [],
      columns: []
    },
    copyToArchive: {
      data: [],
      columns: []
    },
    model_docs: {
      data: [],
      columns: []
    },
    contractArchive: {
      data: [],
      columns: []
    },
    lawArchieve: {
      data: [],
      columns: []
    },
    projArchive: {
      data: [],
      columns: []
    },
    tradeArchive: {
      data: [],
      columns: []
    },
    financeArchive: {
      data: [],
      columns: []
    }
  },
  modelType: '',
  total: 0,
  loading: true,
  dataFromApi: false,
  showModal: false
}
const archiveInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_DATA_ARCHIVE_INFO':
      const tabsDataState = action.tabsData
      let totalArchive = 0
      Object.keys(tabsDataState).map((key) => {
        totalArchive += tabsDataState[key].data.length
      })
      return { ...state, tabs: action.tabsData, total: totalArchive, loading: false, modelType: action.modelType, dataFromApi: true }
    case 'TOGGLE_MODAL_ARCHIVE':
      if (state.showModal) {
        return { ...state, loading: false, showModal: false }
      } else return { ...state, showModal: !state.showModal, loading: true }
    case 'SET_LOADING_ARCHIVE_INFO':
      return { ...state, loading: true }
    case 'UNSET_LOADING_ARCHIVE_INFO':
      return { ...state, loading: false }
    case 'REFRESH_DATA':
      return initialState
    default:
      return { ...state }
  }
}
export default archiveInfo
