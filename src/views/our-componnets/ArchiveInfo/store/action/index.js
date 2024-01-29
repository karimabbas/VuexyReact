import api from '../../../../../@core/util/api'

import { ArchiveColumns } from '../../list'

export const getAllData = (model_id, model, archiveTypes) => {
  return async dispatch => {
    await api().post('getModelArchive', { model_id, model, archiveTypes }).then(response => {
      const data = response.data
      const tabsData = {
        outArchive: {
          data: data?.archive?.outArchive ?? [],
          columns: ArchiveColumns('out_archieve')
        },
        inArchive: {
          data: data?.archive?.inArchive ?? [],
          columns: ArchiveColumns('in_archieve')
        },
        copyToArchive: {
          data: data?.archive?.copyArchive ?? [],
          columns: ArchiveColumns('copy_to')
        },
        model_docs: {
          data: data?.archive?.otherArchive ?? [],
          columns: ArchiveColumns('model_docs')
        },
        contractArchive: {
          data: data?.archive?.contractArchive ?? [],
          columns: ArchiveColumns('contractArchive')
        },
        lawArchieve: {
          data: data?.archive?.lawArchieve ?? [],
          columns: ArchiveColumns('law_archieve')
        },
        projArchive: {
          data: data?.archive?.projArchive ?? [],
          columns: ArchiveColumns('proj_archive')
        },
        tradeArchive: {
          data: data?.archive?.tradeArchive ?? [],
          columns: ArchiveColumns('trade_archive')
        },
        assetsArchive: {
          data: data?.archive?.assetsArchive ?? [],
          columns: ArchiveColumns('assets_archive')
        },
        financeArchive: {
          data: data?.archive?.financeArchive ?? [],
          columns: ArchiveColumns('finance_archive')
        },
        munArchive: {
          data: data?.archive?.munArchive ?? [],
          columns: ArchiveColumns('mun_archieve')
        }
      }
      dispatch({
        type: 'SET_ALL_DATA_ARCHIVE_INFO',
        tabsData,
        modelType: response.data?.type
      })
    })
  }
}
export const refreshData = () => async dispatch => {
  dispatch({
    type: 'REFRESH_DATA'
  })
}
export const setLoadingArchiveInfo = (bool = true) => async dispatch => {
  if (bool) {
    dispatch({
      type: 'SET_LOADING_ARCHIVE_INFO'
    })
  } else {
    dispatch({
      type: 'UNSET_LOADING_ARCHIVE_INFO'
    })
  }
}
export const toggleHandler = () => async dispatch => {
  dispatch({
    type: 'TOGGLE_MODAL_ARCHIVE'
  })
}