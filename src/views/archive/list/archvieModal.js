import React, { Fragment, useEffect } from 'react'
import { toggleHandler, getAllData, refreshData, setLoadingArchiveInfo } from '../../our-componnets/ArchiveInfo/store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { CardText, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import ArchiveTabs from '../../our-componnets/ArchiveInfo/tabs/ArchiveTabs'

function archiveModal (props) {
    const dispatch = useDispatch()
    const archiveInfoStore = useSelector(state => state.archiveInfo)
    const toggleModal = () => {
        dispatch(toggleHandler())
    }
    useEffect(() => {
        if (props.dataModal?.modelData?.model_id) {
            const modelData = props.dataModal?.modelData
            dispatch(toggleHandler())
            dispatch(getAllData(modelData?.model_id, modelData?.model))
        }
    }, [props.dataModal])
    console.log(archiveInfoStore)

    return (
        <Fragment>
            {archiveInfoStore?.loading ? (
                <Modal isOpen={archiveInfoStore?.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent' >
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : (
                <Modal isOpen={archiveInfoStore?.showModal} toggle={toggleModal} className='modal-xl' style={{ minHeight: '500px' }}>
                    <ModalHeader toggle={toggleModal} tag='h4' className='custom-title'>
                        <Label className='font-weight-bold' style={{ fontSize: '1.5rem' }}>الأرشيف {props.dataModal?.modelData?.name && `(${props.dataModal?.modelData.name})`}</Label>
                    </ModalHeader>
                    <ModalBody>
                        <Col className='mb-1' md='12' sm='12'>
                            <ArchiveTabs modelData={props.dataModal?.modelData} />
                        </Col>
                    </ModalBody>
                </Modal>
            )}
        </Fragment>
    )
}

export default archiveModal