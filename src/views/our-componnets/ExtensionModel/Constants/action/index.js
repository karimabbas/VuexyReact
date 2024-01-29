import {ErrorToast, SuccessToast} from '@components/toast'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from "../../../../../@core/util/api"
import {ExtensionColumn} from "../../ExtensionColumn"

export const storeConstant = (data) => async (dispatch, getState) => {
    let state
    api().post('saveConstantsWithParent', data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, {hideProgressBar: false})
            dispatch({
                type: 'ADDConstant',
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
            />, {hideProgressBar: false})
        state = false
    })
    return state
}

export const getAllConstantData = (handleDeleteConstant, setSelected) => {
    const extensionColumnData = ExtensionColumn(handleDeleteConstant, setSelected)
    const config = {
        TypeApi: '',
        url: '',
        title: '',
        dataTableTitle: ''
    }
    config.handleDeleteConstant = handleDeleteConstant
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().get('getAllConstants').then(response => {
            dispatch({
                type: 'GET_ALL_Constant',
                data: response.data,
                columns: extensionColumnData,
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
export const deleteConstant = (id) => async (dispatch) => {
    api().post('deleteConstant', id).then(res => {
        if (res.status === 200) {
            toast.success(
                <SuccessToast
                    result={<h6>{res.data.message} !</h6>}
                />, {hideProgressBar: false})
            dispatch({
                type: 'DELETEConstant',
                id,
                parent: res.data.parent
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
            />, {hideProgressBar: false})
        console.log(err)
    })
}

// const deleteDefinition = async (formData) => {
//     try {
//         const res = await api().post('org_delete', formData)
//         if (res.status === 200) {
//             if (res.data.status) {
//                 toast.success(
//                     <SuccessToast
//                         result={<h6>{res.data.message} !</h6>}
//                     />, { hideProgressBar: false })
//                 return res.data
//             } else {
//                 toast.error(
//                     <ErrorToast
//                         title={<h3>خطأ!</h3>}
//                         result={<h6>{res.data.message} !</h6>}

//                     />, { hideProgressBar: false })
//                 return 'error'
//             }
//         }
//         return res.data
//     } catch (err) {
//         toast.error(
//             <ErrorToast
//                 title={<h3>خطأ!</h3>}
//                 result={
//                     err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
//                 }
//             />, { hideProgressBar: false })
//         return err
//     }
// }
// export const handleDeleteDefintion = (formData, refresh) => {
//     const MySwal = withReactContent(Swal)

//     return MySwal.fire({
//         title: 'هل أنت متأكد من الحذف ؟',
//         icon: 'warning',
//         showCancelButton: true,
//         cancelButtonText: 'الغاء',
//         confirmButtonText: 'نعم !',
//         customClass: {
//             confirmButton: 'btn btn-primary',
//             cancelButton: 'btn btn-outline-danger ml-1'
//         },
//         buttonsStyling: false
//     }).then(function (result) {
//         if (result.value) {
//             deleteDefinition(formData).then(() => {
//                 refresh()
//                 MySwal.fire({
//                     icon: 'success',
//                     title: 'تم !',
//                     text: 'تم حذف الارشيف.',
//                     customClass: {
//                         confirmButton: 'btn btn-success'
//                     }
//                 })
//             })
//         }
//     })
// }