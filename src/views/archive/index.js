import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import ArchiveForm from './ArchiveForm'
import DataTableArchive from '../our-componnets/DataTableArchive'
import Attachment from './Attachment/index'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useParams, useHistory } from "react-router-dom"
import { Row, Col, Modal, Spinner } from 'reactstrap'
import '@styles/base/components/modal.scss'
import { useDispatch, useSelector } from 'react-redux'
import { initialData, getAllData, store, getArchive, setArchive, unsetAttachment, deleteArchive, getEmployeeList } from './store/action'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AbilityContext } from '@src/utility/context/Can'
import ArchiveModal from './list/archvieModal'
const Archive = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [dataModal, setDataModal] = useState({
        modelData: {
            model_id: 0,
            model: '',
            name: ''
        },
        selected: false
    })
    const history = useHistory()
    const { type, archiveId } = useParams()
    const ability = useContext(AbilityContext)

    const dispatch = useDispatch()

    const archiveStore = useSelector(state => state.archives)

    const refresh = () => {
        history.push(`/archive/${type}`)
        setIsSubmitted(prev => !prev)
        dispatch(setArchive())
        dispatch(unsetAttachment())
    }
    const handleShowModal = (data) => {
        setDataModal({ ...data, selected: !dataModal.selected })
    }
    const handleDeleteArchive = async (id) => {

        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            title: 'هل أنت متأكد من الحذف ؟',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'نعم !',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                dispatch(deleteArchive(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'تم !',
                    text: 'تم حذف الارشيف.',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
            }
        })
    }
    const handleArchiveAttachment = async (data) => {

        const MySwal = withReactContent(Swal)

        return MySwal.fire({
            title: 'لا يوجد مرفقات هل تريد الاستمرار ؟',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'نعم !',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                dispatch(store(archiveStore?.config?.archiveTypeApi, type, archiveStore?.attachments, data)).then(() => {
                    refresh()
                })
            }
        }).catch((err => {
            return false
        }))
    }
    useLayoutEffect(() => {
        if (type) {
            refresh()
            const permissions = {
                store_archive: ability.can('read', 'store_archive'),
                delete_archive: ability.can('read', 'delete_archive')
            }
            dispatch(initialData(type, handleDeleteArchive, permissions, handleShowModal))
        }
    }, [type])
    useLayoutEffect(() => {
        dispatch(getEmployeeList())
    }, [])
    useLayoutEffect(() => {
        if (archiveId) {
            const archive_id = +archiveId
            dispatch(getArchive(archive_id, type))
        }
    }, [archiveId])

    const submitHandler = data => {
        if (archiveStore?.attachments?.localAttachments?.length === 0 && archiveStore?.attachments?.serverAttachments?.length === 0) {
            handleArchiveAttachment(data)
        } else {
            dispatch(store(archiveStore?.config?.archiveTypeApi, type, archiveStore?.attachments, data)).then(() => {
                refresh()
            })
        }
    }
    return (
        <>
            {dataModal.modelData.model_id ? (<ArchiveModal dataModal={dataModal} />) : null}
            {archiveStore.loading ? (
                <Modal isOpen={archiveStore.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent' >
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}

            <Row className='match-height'>
                <Col md='6' sm='12'>
                    <ArchiveForm data={archiveStore?.selectedArchive} refresh={refresh} onSubmit={submitHandler} isSubmitted={isSubmitted}
                        title={archiveStore.config.title}
                        type={type} />
                </Col>
                <Col md='6' sm='12'>
                    <Attachment filesData={archiveStore?.selectedArchive?.files} config={archiveStore?.config} employeeList={archiveStore?.employeeList} isSubmitted={isSubmitted} />
                </Col>
            </Row>
            <Row>
                <Col sm='12'>
                    <DataTableArchive type={type} title={archiveStore?.config?.dataTableTitle} data={archiveStore?.data} columns={archiveStore?.columns} />
                </Col>
            </Row>
        </>
    )
}
export default Archive
