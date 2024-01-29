import axios from 'axios'
import api from '../../../../@core/util/api'

import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ArchiveColumns } from '../../list'

// ** Get all Data
const getConfig = (type) => {
  let config = {
    archiveTypeApi: '',
    title: '',
    dataTableTitle: '',
    url: ''
  }
  if (type === 'out_archieve') {
    config = {
      archiveTypeApi: 'outArchive',
      title: 'أرشيف الصادر',
      dataTableTitle: 'المراسلات الصادرة'
    }
  } else if (type === 'in_archieve') {
    config = {
      archiveTypeApi: 'inArchive',
      title: 'أرشيف الوارد',
      dataTableTitle: 'المراسلات الواردة'
    }
  } else if (type === 'proj_archieve') {
    config = {
      archiveTypeApi: 'projArchive',
      title: 'أرشيف المشاريع',
      dataTableTitle: 'أرشيف المشاريع'
    }
  } else if (type === 'assets_archieve') {
    config = {
      archiveTypeApi: 'assetsArchive',
      title: 'أرشيف الأصول',
      dataTableTitle: 'أرشيف الأصول'
    }
  } else if (type === 'emp_archieve') {
    config = {
      archiveTypeApi: 'empArchive',
      title: 'أرشيف الموظفين',
      dataTableTitle: 'أرشيف الموظفين'
    }
  } else if (type === 'cit_archieve') {
    config = {
      archiveTypeApi: 'citArchive',
      title: 'أرشيف الزبائن',
      dataTableTitle: 'أرشيف الزبائن'
    }
  } else if (type === 'dep_archieve') {
    config = {
      archiveTypeApi: 'contractArchive',
      title: 'أرشيف الاتفاقيات والعقود',
      dataTableTitle: 'أرشيف الاتفاقيات والعقود'
    }
  } else if (type === 'law_archieve') {
    config = {
      archiveTypeApi: 'lawArchieve',
      title: 'ارشيف القوانين والاجراءات',
      dataTableTitle: 'ارشيف القوانين والاجراءات'
    }
  } else if (type === 'finance_archive') {
    config = {
      archiveTypeApi: 'financeArchive',
      title: 'ارشيف المالية',
      dataTableTitle: 'ارشيف المالية'
    }
  } else if (type === 'trade_archive') {
    config = {
      archiveTypeApi: 'tradeArchive',
      title: 'ارشيف المعاملات',
      dataTableTitle: 'ارشيف المعاملات'
    }
  } else if (type === 'mun_archieve') {
    config = {
      archiveTypeApi: 'munArchive',
      title: 'ارشيف المؤسسة',
      dataTableTitle: 'ارشيف المؤسسة'
    }
  } else if (type === 'lic_archieve') {
    config = {
      archiveTypeApi: 'licArchieve',
      title: 'ارشيف رخص البناء / ملف الترخيص',
      dataTableTitle: 'ارشيف رخص البناء / ملف الترخيص'
    }
  }
  return config
}
export const initialData = (type, handleDeleteArchive, permissions, handleShowModal) => {
  const archiveColumnsData = ArchiveColumns(type, handleDeleteArchive, permissions, handleShowModal)
  const config = getConfig(type)
  config.url = type
  config.handleDeleteArchive = handleDeleteArchive
  return async dispatch => {
    const response = await api().post('initialData', { type: config.archiveTypeApi })
    config.employeeShareList = await response.data?.archiveRole
    config.archiveTypeExtensions = await response.data?.archiveTypeExtensions
    dispatch({
      type: 'GET_ALL_ARCHIVE',
      data: response.data?.archive,
      columns: archiveColumnsData,
      config,
      auto_complete_models: response.data?.auto_complete,
      vehicle_auto_complete: response.data?.vehicle_auto_complete
    })
  }
}
export const getAllData = (type) => {
  const config = getConfig(type)
  return async dispatch => {
    await api().post('dependenciesDataArchive', { type: config.archiveTypeApi }).then(response => {
      config.employeeShareList = response.data?.archiveRole
      config.archiveTypeExtensions = response.data?.archiveTypeExtensions
      dispatch({
        type: 'GET_ALL_ARCHIVE_DEPENDS',
        config,
        auto_complete_models: response.data?.auto_complete,
        vehicle_auto_complete: response.data?.vehicle_auto_complete
      })
    })
  }
}
export const getFiltererAutoComplete = (model) => {
  return async dispatch => {
    dispatch({
      type: 'FilteredAutoComplete',
      model
    })
  }
}
export const getEmployeeList = () => {
  return async dispatch => {
    await api().get('employee_auto_complete').then(response => {
      dispatch({
        type: 'ADD_EMPLOYEE',
        employeeList: response.data
      })
    })
  }
}
export const EmployeeShareHandler = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_EMPLOYEE_SHARE',
      employeeShareList: data
    })
  }
}
export const addEmployeeShare = () => {
  return async (dispatch, getState) => {
    const store = getState()
    const config = store.archives?.config
    const obj = {
      archiveType: config?.archiveTypeApi,
      config_id: config?.archive_config?.id,
      data: config?.employeeShareList
    }
    await api().post('store_archive_config', obj).then((res) => {
      toast.success(
        <SuccessToast
          result={<h6>تهانينا تمت العملية بنجاح!</h6>}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    }).catch((err) => {
      console.log(err)
      toast.error(
        <ErrorToast
          title={<h3>خطأ!</h3>}
          result={
            err?.errors?.map((error, index) => <h5 key={index}>{index + 1} : {error} </h5>)
          }
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    })
  }
}
export const getData = params => {
  return async dispatch => {
    dispatch({
      type: 'GET_DATA'
    })
  }
}

// ** Get data on page or row change

export const setLoading = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOADING'
    })
  }
}
export const unSetLoading = () => {
  return async dispatch => {
    dispatch({
      type: 'UNSET_LOADING'
    })
  }
}
export const setAttachment = (files) => {
  return async dispatch => {
    dispatch({
      type: 'SET_FILES',
      attachments: {
        localAttachments: [...files.files],
        serverAttachments: [...files.filesUploaded]
      }
    })
  }
}
export const unsetAttachment = () => {
  return async dispatch => {
    dispatch({
      type: 'UNSET_FILES'
    })
  }
}
// ** Get User
export const getArchive = (archive_id, type) => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOADING'
    })
    let getArchiveApi = 'getArchive'
    if (type === 'trade_archive') getArchiveApi = 'tradeArchive_info'

    await api().post(getArchiveApi, { archive_id })
      .then(response => {
        dispatch({
          type: 'GET_ARCHIVE',
          selectedArchive: response.data
        })
      })
      .catch(err => console.log(err))
    dispatch({
      type: 'UNSET_LOADING'
    })
  }
}
export const setArchive = () => {
  return async dispatch => {
    await dispatch({
      type: 'SET_ARCHIVE',
      selectedArchive: null
    })
  }
}
export const store = (msgType, type, attachments, data) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING'
  })
  const formData = new FormData()
  formData.append('msgType', msgType)
  formData.append('url', type)
  for (let index = 0; index < attachments?.localAttachments.length; index++) {
    formData.append('files[]', attachments.localAttachments[index])
  }
  const serverFiles = attachments.serverAttachments
  formData.append('serverFiles', JSON.stringify(serverFiles))
  Object.keys(data).map(key => {
    if (key === 'copyTo') {
      const copyToArray = data[key]
      formData.append('copyTo', JSON.stringify(copyToArray))
    } else {
      formData.append(key, data[key])
    }
  })
  let storeArchiveApi = 'store_archive'
  if (type === 'trade_archive') storeArchiveApi = 'store_trade_archive'
  else if (type === 'lic_archieve') storeArchiveApi = 'storeLicArchive'

  await api().post(storeArchiveApi, formData).then((response) => {
    toast.success(
      <SuccessToast
        result={<h6>تهانينا تمت العملية بنجاح!</h6>}
      />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    dispatch({
      type: 'ADD_ARCHIVE',
      item: response.data.data
    })
    if (data.withPrint) {
      window.open(`/archive_print/${type}/${response.data?.data?.id}`)
      console.log('print')
    } else {
      console.log('in')
    }
  }).catch((err) => {
    toast.error(
      <ErrorToast
        title={<h3>خطأ!</h3>}
        result={
          err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
        }
      />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    console.log(err)
    // return dispatch({
    //   type: 'SET_ARCHIVE_ERROR',
    //   errors: true
    // })
  })
  dispatch({
    type: 'UNSET_LOADING'
  })
}
export const deleteArchive = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'SET_LOADING'
  })
  const store = getState()
  const type = store.archives?.config?.url
  const handleDeleteArchive = store.archives?.config?.handleDeleteArchive
  let deleteArchiveApi = 'archive_delete'
  if (type === 'trade_archive') deleteArchiveApi = 'tradeArchive_delete'
  await api().post(deleteArchiveApi, { archive_id: id }).then(res => {
    if (res.status === 200) {
      if (res.data.status) {
        toast.success(
          <SuccessToast
            result={<h6>{res.data.message} !</h6>}
          />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })

        dispatch({
          type: 'DELETE_ARCHIVE',
          id
        })
      } else {
        toast.error(
          <ErrorToast
            title={<h3>خطأ!</h3>}
            result={<h6>{res.data.message} !</h6>}

          />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
      }
    }
  }).catch((err) => {
    toast.error(
      <ErrorToast
        title={<h3>خطأ!</h3>}
        result={
          err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
        }
      />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    console.log(err)
  })
  dispatch({
    type: 'UNSET_LOADING'
  })
}
// ** Add new user