import React, { Fragment, useEffect } from 'react'
import { toggleHandler, getAllData, refreshData } from './store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { CardText, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import ArchiveTabs from './tabs/ArchiveTabs'

function index (props) {
    const dispatch = useDispatch()
    const archiveInfoStore = useSelector(state => state.archiveInfo)
    const toggleModal = () => {
        dispatch(toggleHandler())
    }
    const getArchiveTypes = (type) => {
        if (type === 'show_employee') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'show_department') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive', 'lawArchieve']
        } else if (type === 'show_projects') {
            return ['projArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'show_customer') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive', 'tradeArchive']
        } else if (type === 'orginzation') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'suppliers') {
            return ['outArchive', 'inArchive', 'financeArchive', 'otherArchive', 'copyArchive', 'contractArchive']
        } else if (type === 'show_banks') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'show_enginering' || type === 'show_space') {
            return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'equip') {
            return ['assetsArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'vehicle') {
            return ['assetsArchive', 'tradeArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'show_buildings' || type === 'show_warehouses' || type === 'show_gardens_lands') {
            return ['assetsArchive', 'copyArchive', 'contractArchive', 'financeArchive']
        } else if (type === 'orgnization_details') {
            return ['munArchive', 'lawArchieve']
        }
        return ['outArchive', 'inArchive', 'otherArchive', 'copyArchive', 'contractArchive', 'financeArchive']
    }
    useEffect(() => {        
            dispatch(refreshData())
    }, [props.type])
    useEffect(() => {
        if (props.type === 'orgnization_details') {
            dispatch(getAllData(0, 'orgnization_details', getArchiveTypes(props.type)))
        }
        if (props.modelData?.model_id) {
            const modelData = props.modelData
            dispatch(getAllData(modelData?.model_id, modelData?.model, getArchiveTypes(props.type)))
        }
    }, [props.modelData])
    return (
        <Fragment>
            <div onClick={toggleModal}>
                <img src={'https://t.palexpand.ps/assets/images/ico/msg.png'}
                    alt='user-avatar'
                    className='img-fluid rounded' height='65' width='65' />
                <CardText className={'inner-archive-title'}>
                    الأرشيف
                    <span className={'inner-archive-count'}>
                        ({archiveInfoStore?.total})
                    </span>
                </CardText>
            </div>

            <Modal isOpen={archiveInfoStore.showModal} toggle={toggleModal} className='modal-xl' style={{ minHeight: '500px' }}>
                <ModalHeader toggle={toggleModal} tag='h4' className='custom-title'>
                    <Label className='font-weight-bold' style={{ fontSize: '1.5rem', color: '#ffffff' }}>الأرشيف {props.modelData?.name && `(${props.modelData.name})`}</Label>
                </ModalHeader>
                <ModalBody>
                    <Col className='mb-1' md='12' sm='12'>
                        <ArchiveTabs modelData={props.modelData} type={props.type} />
                    </Col>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default index