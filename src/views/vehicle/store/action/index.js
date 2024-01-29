import api from '../../../../@core/util/api'
import {ErrorToast, SuccessToast} from '@components/toast'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {VehicleColumns} from "../../list"

export const storeVehicle = (data) => async (dispatch) => {

    api().post('store_vehicle', data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            console.log(response.data)
            dispatch({
                type: 'ADD_VEHICLE',
                item: response.data.data
            })

            dispatch({
                type: 'SET_VEH_REFRESH',
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
            type: 'SET_VEH_REFRESH',
            value: false
        })
    })
}

export const getAllVehicleData = (handleDeleteVehicle, vehicleId) => {
    const vehicleColumnData = VehicleColumns(handleDeleteVehicle)
    const config = {
        TypeApi: '',
        url: 'vehicle',
        title: 'المركبات',
        dataTableTitle: 'المركبات'
    }
    config.handleDeleteArchive = handleDeleteVehicle
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('getAllVehicle').then(response => {
            dispatch({
                type: 'GET_ALL_VEHICLE_DATA',
                data: response.data,
                columns: vehicleColumnData,
                config,
                id_selected : vehicleId

            })
            dispatch({
                type: 'UNSET_LOADING'
            })
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
export const deleteVehicle = (id) => async (dispatch) => {
    api().post('deleteVehicle', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, {hideProgressBar: false})
                dispatch({
                    type: 'DELETE',
                    id
                })
            } else {
                toast.error(
                    <ErrorToast
                        title={<h3>خطأ!</h3>}
                        result={<h6>{res.data.message} !</h6>}

                    />, {hideProgressBar: false})
            }
        }
    }).catch((err) => {
        toast.error(
            <ErrorToast
                title={<h3>خطأ!</h3>}
                result={
                    err?.errorsRaw?.map((error, index) => <h5 key={(index + 1)}>{index + 1} : {error} </h5>)
                }
            />, {hideProgressBar: false})
        console.log(err)
    })
}
