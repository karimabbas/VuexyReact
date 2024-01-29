import { ErrorToast, SuccessToast } from '@components/toast'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from "../../../../../@core/util/api"
import { cityColumn, regionColumn, townColumn } from "../../ExtensionColumn"

export const storeAddress = (data, type) => async (dispatch, getState) => {
    let state, url, dispatchType
    if (type === 'city') {
        url = 'saveCity'
        dispatchType = 'ADDCity'
    } else if (type === 'town') {
        url = 'saveTownWithParent'
        dispatchType = 'ADDTown'
    } else if (type === 'region') {
        url = 'saveRegionWithParent'
        dispatchType = 'ADDRegion'
    }
    api().post(url, data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false })
            dispatch({
                type: dispatchType,
                item: response?.data?.data
            })
            state = true
        }).catch((err) => {
            console.log(err)
            toast.error(
                <ErrorToast
                    title={<h3>خطأ!</h3>}
                    result={
                        err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                    }
                />, { hideProgressBar: false })
            state = false
        })
    return state
}

export const getAllAddressData = (handleDeleteAddress, setSelectedAddress) => {
    const cityColumnData = cityColumn(handleDeleteAddress, setSelectedAddress)
    const townColumnData = townColumn(handleDeleteAddress, setSelectedAddress)
    const regionColumnData = regionColumn(handleDeleteAddress, setSelectedAddress)
    const config = {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    }
    config.handleDeleteConstant = handleDeleteAddress
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().get('getAddressData').then(response => {
            dispatch({
                type: 'GET_ALL_Address',
                data: response.data,
                cityColumn: cityColumnData,
                townColumn: townColumnData,
                regionColumn: regionColumnData,
                config
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
export const deleteAddress = (data, type) => async (dispatch) => {
    let url, dispatchType
    if (type === 'city') {
        url = 'deleteCity'
        dispatchType = 'DELETECity'
    } else if (type === 'town') {
        url = 'deleteTown'
        dispatchType = 'DELETETown'
    } else if (type === 'region') {
        url = 'deleteRegion'
        dispatchType = 'DELETERegions'
    }
    api().post(url, { id: data }).then(res => {
        if (res.status === 200) {
            toast.success(
                <SuccessToast
                    result={<h6>{res.data.message} !</h6>}
                />, { hideProgressBar: false })
            dispatch({
                type: dispatchType,
                id: res?.data?.id,
                parent: res?.data?.parent ?? 0
            })
        }
    }).catch((err) => {
        console.log(err)
        toast.error(
            <ErrorToast
                title={<h3>خطأ!</h3>}
                result={
                    err?.errorsRaw?.map((error, index) => <h5 key={(index + 1)}>{index + 1} : {error} </h5>)
                }
            />, { hideProgressBar: false })
        console.log(err)
    })
}
