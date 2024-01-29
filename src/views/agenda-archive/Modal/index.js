import React, { useState, useEffect } from 'react'
import { Button, CardText, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setMeeting, storeMeeting, deleteMeeting } from '../store/action'
import { Edit, Delete } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

function index (props) {
    const [permissionsEmployees, setPermissionsEmployees] = useState([])
    const [sigEmployee, setSigEmployee] = useState(null)
    const [meetingTitle, setMeetingTitle] = useState('')
    const [position, setPosition] = useState('')
    const [meetingId, setMeetingId] = useState(0)
    const meetingArchiveStore = useSelector(state => state.meetingArchive)
    const meetingList = meetingArchiveStore.meetingList
    const employeeList = meetingArchiveStore.employeeList
    const meetingSelected = meetingArchiveStore.meetingSelected
    const refresh = meetingArchiveStore.refresh
    const dispatch = useDispatch()
    const handleSelectEmployeeChange = employee => {
        setPermissionsEmployees(employee)
    }
    const editHandler = (id) => {
        dispatch(setMeeting(id))
    }
    useEffect(() => {
        setMeetingId(0)
        setPermissionsEmployees([])
        setMeetingTitle('')
        setPosition('')
        setSigEmployee(null)
    }, [refresh])
    useEffect(() => {
        setMeetingId(meetingSelected?.id ? meetingSelected?.id : 0)
        setPermissionsEmployees(meetingSelected?.employeeData ? meetingSelected?.employeeData : [])
        setMeetingTitle(meetingSelected?.name ? meetingSelected?.name : '')
        setPosition(meetingSelected?.signature_jobtitle ? meetingSelected?.signature_jobtitle : '')
        setSigEmployee(meetingSelected?.signature_emp_data ? meetingSelected?.signature_emp_data : null)
    }, [meetingSelected])
    const deleteHandler = (id) => {
        dispatch(deleteMeeting(id))
    }
    const renderData = () => {
        return meetingList.map((item, index) => {
            return (
                <tr key={item?.name}>
                    <td className='font-weight-bolder'>
                        <div className='font-weight-bolder'>{index + 1}</div>
                    </td>
                    <td className='font-weight-bolder'>
                        <div className='font-weight-bolder'>{item?.name}</div>
                    </td>
                    <td className='font-weight-bolder'>
                        <Edit size={17} color='#1E9FF2' strokeWidth={3} style={{ marginLeft: '3px', cursor: 'pointer' }} onClick={() => editHandler(item.id)} />
                        <Delete size={20} fill='red' color='#FFF' strokeWidth={3} style={{ cursor: 'pointer' }} onClick={() => deleteHandler(item.id)} />
                    </td>
                </tr>
            )
        })
    }
    const submitHandler = () => {
        const permissionsEmployeesIds = permissionsEmployees.map(item => item.id)
        const signature_emp = sigEmployee?.id
        const obj = {
            id: meetingId ? meetingId : 0,
            permissionsEmployees: permissionsEmployeesIds,
            signature_emp,
            name: meetingTitle,
            signature_jobtitle: position,
            employeeData: permissionsEmployees,
            signature_emp_data: sigEmployee
        }
        dispatch(storeMeeting(obj))
    }
    const renderSaveWord = () => {
        return 'حفظ'
    }
    const toggleHandler = (e) => {
        dispatch({
            type: 'SET_MEETING_REFRESH'
        })
        props.toggleModal(e)
    }
    return (
        <>
            <Modal isOpen={props.showModal} toggle={toggleHandler} className='modal-md' style={{ minHeight: '500px' }}>
                <ModalHeader toggle={toggleHandler} tag='h4' className='custom-title'>
                    اضافة اجتماع
                </ModalHeader>
                <ModalBody>
                    <Row className='mb-1'>
                        <Table responsive style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>العنوان</th>
                                    <th>الحركات</th>
                                </tr>
                            </thead>
                            <tbody>{renderData()}</tbody>
                        </Table>
                    </Row>
                    <Row className='mb-1'>
                        <Col sm={12}>
                            <Label for='msgTitle'>عنوان الاجتماع</Label>
                            <Input
                                id='msgTitle'
                                value={meetingTitle}
                                onChange={e => setMeetingTitle(e.target.value)}
                                name='msgTitle'
                                placeholder='عنوان الاجتماع'
                            />
                        </Col>
                    </Row>
                    <Input
                        id='id'
                        name='id'
                        type='hidden'
                        value={meetingId}
                    />
                    <Row className='mb-1'>
                        <Col sm={12}>
                            <Label>الصلاحيات</Label>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                value={permissionsEmployees}
                                isMulti
                                bsSize='lg'
                                placeholder='اختر من القائمة ...'
                                name='archive_config'
                                options={employeeList}
                                onChange={handleSelectEmployeeChange}
                                className='react-select'
                                classNamePrefix='select'
                                noOptionsMessage={() => 'لا يوجد بيانات !'}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col sm={12}>
                            <Label>الموظف للتوقيع</Label>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                value={sigEmployee}
                                isMulti={false}
                                bsSize='lg'
                                placeholder='اختر من القائمة ...'
                                name='archive_config'
                                options={employeeList}
                                onChange={emp => setSigEmployee(emp)}
                                className='react-select'
                                classNamePrefix='select'
                                noOptionsMessage={() => 'لا يوجد بيانات !'}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col sm={12}>
                            <Label for='signature_jobtitle'>المسمى الوظيفي</Label>
                            <Input
                                id='signature_jobtitle'
                                name='signature_jobtitle'
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                                placeholder='المسمى الوظيفي'
                            />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col sm={12}>
                            <FormGroup className='d-flex mb-0 mt-1 justify-content-center'>
                                <Button.Ripple className='mr-1' color='primary' type='button' onClick={submitHandler}>
                                    {renderSaveWord()}
                                </Button.Ripple>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}

export default index