import api from '../../../../@core/util/api'
// ** Get all Data
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'

export const initialData = () => {
  return async dispatch => {
    const response = await api().get('agendaArchive')
    dispatch({
      type: 'GET_ALL_MEETING_ARCHIVE',
      meetingList: response.data?.agendaExtention,
      employeeList: response.data?.employees,
      loading: false
    })
  }
}
export const setMeeting = (id) => {
  return async dispatch => {
    dispatch({
      type: 'SET_SELECTED_MEETING',
      id
    })
  }
}
export const setSelectMeeting = (meeting) => {
  return async dispatch => {
    dispatch({
      type: 'SELECT_MEETING',
      meeting
    })
  }
}
export const setAgendaDate = (agendaDate) => {
  return async dispatch => {
    dispatch({
      type: 'SELECT_AGENDA_DATE',
      agendaDate
    })
  }
}
export const setAgendaNum = (agendaNum) => {
  return async dispatch => {
    dispatch({
      type: 'SELECT_AGENDA_NUM',
      agendaNum
    })
  }
}
export const storeMeeting = (obj) => {
  return async dispatch => {
    const response = await api().post('doAddMeetingTitles', obj)
    console.log(response)
    if (response.status) {
      toast.success(
        <SuccessToast
          result={<h6>تهانينا تمت العملية بنجاح!</h6>}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
      dispatch({
        type: 'ADD_MEETING',
        item: obj
      })
    } else {
      console.log(err)
      toast.error(
        <ErrorToast
          title={<h3>خطأ!</h3>}
          result={'حدث خطأ'}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    }
  }
}
export const storeTopic = (formData, objectLocal) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_MEETING_ARCHIVE_LOADING'
      })
      const response = await api().post('ajaxSaveDesicion', formData)
      if (response.status) {
        toast.success(
          <SuccessToast
            result={<h6>تهانينا تمت العملية بنجاح!</h6>}
          />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
        const topicData = response.data
        objectLocal.id = topicData?.id
        dispatch({
          type: 'ADD_TOPIC_MEETING',
          topic: objectLocal
        })
      } else {
        console.log(err)
        toast.error(
          <ErrorToast
            title={<h3>خطأ!</h3>}
            result={'حدث خطأ'}
          />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
      }
    } catch (error) {
      dispatch({
        type: 'UNSET_MEETING_ARCHIVE_LOADING'
      })
      console.log(error)
      toast.error(
        <ErrorToast
          title={<h3>خطأ!</h3>}
          result={'حدث خطأ'}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    }

  }
}
export const getAgendaTopics = (obj) => {
  return async dispatch => {
    const response = await api().post('ajaxDisplayMeeting', obj)
    if (response.status) {
      dispatch({
        type: 'SET_MEETING_TOPICS',
        topicsSelected: response.data
      })
    } else {
      console.log(err)
      toast.error(
        <ErrorToast
          title={<h3>خطأ!</h3>}
          result={'حدث خطأ'}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    }
  }
}
export const deleteMeeting = (id) => {
  return async dispatch => {
    const response = await api().post('deleteMeetingTitle', { id })
    console.log(response)
    if (response.status) {
      toast.success(
        <SuccessToast
          result={<h6>تم الحذف بنجاح!</h6>}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
      dispatch({
        type: 'DELETE_MEETING',
        id
      })
    } else {
      console.log(err)
      toast.error(
        <ErrorToast
          title={<h3>خطأ!</h3>}
          result={'حدث خطأ'}
        />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
    }
  }
}
export const setLoading = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_MEETING_ARCHIVE_LOADING'
    })
  }
}
export const unSetLoading = () => {
  return async dispatch => {
    dispatch({
      type: 'UNSET_MEETING_ARCHIVE_LOADING'
    })
  }
}