import { useState, useEffect, useLayoutEffect } from 'react'
import { Row, Col, Modal, Spinner } from 'reactstrap'

import '@styles/base/components/modal.scss'
import { useDispatch, useSelector } from 'react-redux'

import { initialData, getAgendaTopics } from './store/action'
import CardOne from './CardOne'
import CardTwo from './CardTwo'
const index = () => {
    const dispatch = useDispatch()
    const meetingArchiveStore = useSelector(state => state.meetingArchive)
    const topicsSelected = meetingArchiveStore?.topicsSelected

    useLayoutEffect(() => {
        dispatch(initialData())
    }, [])

    return (
        <>
            {meetingArchiveStore?.loading ? (
                <Modal isOpen={meetingArchiveStore?.loading} className='modal-dialog-centered custom-spinner-modal'>
                    <div className='w-100 h-100 p-0 m-0 b-transparent' >
                        <Spinner color='primary custom-spinner-loading' />
                    </div>
                </Modal>
            ) : null}
            <CardOne />
            <CardTwo />
        </>
    )
}

export default index
