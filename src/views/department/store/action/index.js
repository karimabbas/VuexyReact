import api from '../../../../@core/util/api'
import {ErrorToast, SuccessToast} from '@components/toast'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {departmentColumns} from "../../list"


export const storeDepartment = (data) => async (dispatch, getState) => {
    let state
    api().post('storeDepartment', data)
        .then((response) => {
            toast.success(
                <SuccessToast
                    result={<h6>تهانينا تمت العملية بنجاح!</h6>}
                />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
            dispatch({
                type: 'ADDDepartment',
                item: response.data.data
            })
            state = true
        }).catch((err) => {
        toast.error(
            <ErrorToast
                title={<h3>خطأ!</h3>}
                result={
                    err?.errorsRaw?.map((error, index) => <h5>{index + 1} : {error} </h5>)
                }
            />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
        state = false
    })
    return state
}

export const getAllDepartmentData = (handleDeleteArchive, deptId) => {
    const departmentColumnData = departmentColumns(handleDeleteArchive)
    const config = {
        TypeApi: '',
        url: 'department',
        title: 'الاقسام',
        dataTableTitle: 'الاقسام'
    }
    config.handleDeleteArchive = handleDeleteArchive
    return async dispatch => {
        dispatch({
            type: 'SET_LOADING'
        })
        api().post('dept_info_all').then(response => {
            dispatch({
                type: 'GET_ALL_Department',
                data: (response?.data?.departments ?? []),
                employees: (response?.data?.employees ?? []),
                columns: departmentColumnData,
                config,
                id_selected : deptId

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
export const deleteDepartment = (id) => async (dispatch) => {
    api().post('deleteDepartment', id).then(res => {
        if (res.status === 200) {
            if (res.data.status) {
                toast.success(
                    <SuccessToast
                        result={<h6>{res.data.message} !</h6>}
                    />, { hideProgressBar: false, autoClose: 2500, position: 'top-center' })
                dispatch({
                    type: 'DELETEDepartment',
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