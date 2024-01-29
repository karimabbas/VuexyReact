import api from '../../../../../@core/util/api'
import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getConfig } from '../../../config'
import { InstitutionsAndOfficesColumns } from '../../data'

export const store_Orginzation = (def, data) => async (dispatch) => {

    let state

    api().post('storeOrginzation', data)
        .then((response) => {
            console.log(response)
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            // console.log(response.data)
            dispatch({
                type: 'ADD_Orginzation',
                item: response.data.data
            })

            dispatch({
                type: 'SET_REFRESH',
                value: true
            })

        }).catch((err) => {
            console.log(err)

            toast.error(
                <ErrorToast
                    title={<h3>خطأ!</h3>}
                    result={
                        err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                    }
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            dispatch({
                type: 'SET_REFRESH',
                value: false
            })
            state = false
        })
    return state
}

export const get_All_Orginzation_Data = (def, handleDeleteDefintion, defId) => {

    const config = getConfig(def)
    const defColumnsData = InstitutionsAndOfficesColumns(def, handleDeleteDefintion)

    config.handleDeleteDefintion = handleDeleteDefintion

    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('orgnization_info_all', { type: config.TypeApi }).then(response => {
            dispatch({
                type: 'GET_ALL_ORG_DATA',
                data: (response.data?.orginzation ?? []),
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
            type: 'SET_REFRESH'
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
export const deleteDefinition = (id) => async (dispatch) => {
    api().post('org_delete', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETE_ORG',
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

