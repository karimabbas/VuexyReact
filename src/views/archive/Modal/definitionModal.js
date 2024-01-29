import React, { useState, useEffect } from 'react'
import { CardText, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import DefinitionTabs from './DefinistionTabs'
function definitionModal (props) {
    const Title = () => {
        const type = props.type
        if (type === 'proj_archieve') {
            return 'تعريف مشروع جديد'
        } else if (type === 'assets_archieve') {
            return 'تعريف اصول جديد'
        } else if (type === 'vehicle') {
            return 'تعريف مركبة جديدة'
        } else if (type === 'emp_archieve') {
            return 'تعريف موظف جديد'
        } else if (type === 'cit_archieve') {
            return 'تعريف زبون جديد'
        } else if (type === 'dep_archieve') {
            return 'تعريف قسم جديد'
        } else if (type === 'trade_archive') {
            return 'تعريف زبون جديد'
        } else if (type === 'mun_archieve') {
            return 'تعريف جديد'
        } else if (type === 'lic_archieve') {
            return 'تعريف زبون جديد'
        }
        return 'تعريف جديد'
    }
    return (
        <>
            <Modal isOpen={props.showModal} toggle={props.toggleModal} className='modal-xl' style={{ minHeight: '500px' }}>
                <ModalHeader toggle={props.toggleModal} tag='h4' className='custom-title'>
                    <Title />
                </ModalHeader>
                <ModalBody>
                    <Col className='mb-1' md='12' sm='12'>
                        <DefinitionTabs type={props.type} />
                    </Col>
                </ModalBody>
            </Modal>
        </>
    )
}

export default definitionModal