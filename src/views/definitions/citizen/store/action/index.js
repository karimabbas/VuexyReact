import api from '../../../../../@core/util/api'
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getConfig } from '../../../config'
import { CitizenColumns } from '../../data'

export const store_subscriber = (def, data) => async (dispatch) => {

    api().post('storeSubscriber', data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            console.log(response.data)
            dispatch({
                type: 'ADD_CITIZEN',
                item: response.data.data
            })

            dispatch({
                type: 'SET_CITIZEN_REFRESH',
                value:true
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
                type: 'SET_CITIZEN_REFRESH',
                value:false
            })
        })
}

export const get_All_Citizen_Data = (def, handleDeleteDefintion, defId) => {

    const config = getConfig(def)
    const defColumnsData = CitizenColumns(def, handleDeleteDefintion)

    config.handleDeleteDefintion = handleDeleteDefintion

    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('citizen_info_all', { type: config.TypeApi }).then(response => {
            dispatch({
                type: 'GET_ALL_CITIZENS_DATA',
                data: (response.data?.subscriber ?? []),
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


export const deleteCitizen = (id) => async (dispatch) => {

    api().post('subscribe_delete', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETE_CITIZEN',
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

