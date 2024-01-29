import api from '../../../../../@core/util/api'
import {ErrorToast, SuccessToast} from '@components/toast'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getConfig} from '../../../config'
import {CustomerColumns} from '../../data'

export const store_Customer = (def, data) => async (dispatch) => {
    let state
    api().post('storeCustomer', data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            // console.log(response.data)
            dispatch({
                type: 'ADD_Customer',
                item: response.data.data
            })

            dispatch({
                type: 'SET_Customer_REFRESH',
                value: true
            })

        }).catch((err) => {
        toast.error(
            <ErrorToast
                title={<h3>خطأ!</h3>}
                result={
                    err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                }
            />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
        dispatch({
            type: 'SET_Customer_REFRESH',
            value: false
        })
        state = false
    })
    return state
}

export const get_All_Customer_Data = (def, handleDeleteDefintion, defId) => {

    const config = getConfig(def)
    const defColumnsData = CustomerColumns(def, handleDeleteDefintion)

    config.handleDeleteDefintion = handleDeleteDefintion

    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('allCustomer', {type: config.TypeApi}).then(response => {
            dispatch({
                type: 'GET_ALL_customer_DATA',
                data: (response.data?.customers ?? []),
                employees: (response?.data?.employees ?? []),
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
            type: 'SET_Customer_REFRESH'
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
export const deleteCustomer = (def, id) => async (dispatch) => {
    console.log(def, id)
    api().post('deleteCustomer', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETE_Customer',
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

