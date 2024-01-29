import api from '../../../../../@core/util/api'
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getConfig } from '../../../config'
import { EmployeeColumns } from '../../data'

export const store_Employee = (def, data) => async (dispatch) => {

    const formData = new FormData()

    Object.keys(data).map(key => {
        if (key === 'imageFiles') {
            console.log(data[key])
            const files = data[key]
            formData.append('image', files?.imgPic)
        } else {
            console.log(data)
            formData.append(key, data[key])
        }
    })
    let state
    api().post('storeEmployee', formData)
        .then((response) => {
            // console.log(response)

            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            // console.log(response.data)
            dispatch({
                type: 'ADD_Employee',
                item: response.data.data
            })

            dispatch({
                type: 'SET_Emp_REFRESH',
                value: true
            })

        }).catch((err) => {
            toast.error(
                <ErrorToast
                    title={<h3>خطأ!</h3>}
                    result={
                        err?.errorsRaw?.map((error, index) => <h5 key={index + 1} >{index + 1} : {error} </h5>)
                    }
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })

            dispatch({
                type: 'SET_Emp_REFRESH',
                value: false
            })
            state = false
        })
    return state
}

export const get_All_Emp_Data = (def, handleDeleteDefintion, defId) => {

    const config = getConfig(def)
    const defColumnsData = EmployeeColumns(def, handleDeleteDefintion)

    config.handleDeleteDefintion = handleDeleteDefintion

    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('emp_info_all', { type: config.TypeApi }).then(response => {
            dispatch({
                type: 'GET_ALL_Emp_DATA',
                data: (response.data?.employees ?? []),
                departments: (response?.data?.departments ?? []),
                columns: defColumnsData,
                config,
                id_selected : defId
            })
            dispatch({
                type: 'UNSET_LOADING'
            })
        })
    }
}

export const setrefresh = () => {
    return async dispatch => {
        dispatch({
            type: 'SET_Emp_REFRESH'
        })
    }
}

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

export const deleteEmployee = (def, id) => async (dispatch) => {
    console.log(def, id)
    api().post('deleteEmployee', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETE_Employee',
                    id
                })
            } else {
                toast.error(
                    <ErrorToast
                        title={<h3>خطأ!</h3>}
                        result={<h6>{res.data.message} !</h6>}

                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                return 'error'
            }
        }
    })

}

