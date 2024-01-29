import api from '../../../../@core/util/api'
import {ErrorToast, SuccessToast} from '@components/toast'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { EquipmentColumns } from '../../list'
// import {EmployeeColumns} from '../../data'

export const store_Equipment = (data) => async (dispatch) => {

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
    api().post('store_equpment', formData)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            console.log(response.data.data)
            dispatch({
                type: 'ADD_EQUIPMENT',
                item: response.data.data
            })

            dispatch({
                type: 'SET_Equ_REFRESH',
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
            type: 'SET_Equ_REFRESH',
            value: false
        })
    })
}

export const getAllEquipmenteData = (handleDeleteEquipment, equipId) => {
    const EquipmentColumnData = EquipmentColumns(handleDeleteEquipment)
    const config = {
        TypeApi: '',
        url: 'equip',
        title: 'المعدات',
        dataTableTitle: 'المعدات'
    }
    config.handleDeleteEquipment = handleDeleteEquipment
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('equip_info_all').then(response => {
            dispatch({
                type: 'GET_ALL_EQU_DATA',
                data: (response.data?.equipments ?? []),
                employees: (response?.data?.empForSelect ?? []),
                departments: (response?.data?.departments ?? []),
                organization: (response?.data?.organization ?? []),
                columns: EquipmentColumnData,
                config,
                id_selected : equipId

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
export const deleteEquipment = (id) => async (dispatch) => {
    api().post('equip_delete', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETE_EQUIPMENT',
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

