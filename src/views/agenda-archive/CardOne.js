import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Row, Col, Modal, Spinner, Label, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Card, CardBody, Table } from 'reactstrap'
import api from '../../@core/util/api'
import { useDispatch, useSelector } from 'react-redux'
import SelectSync from './SelectSync'
import { Calendar, Link2 } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getAgendaTopics, setSelectMeeting, setAgendaNum, setAgendaDate } from './store/action'
const dateNow = Date.now()
const today = new Date(dateNow)
function addLeadingZeros (num, totalLength) {
  return String(num).padStart(totalLength, '0')
}
const format = (date) => {
  return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}
const CardOne = () => {
    // const [meeting, setMeeting] = useState({})
    // const [msgDate, setMsgDate] = useState([today])
    // const [agendaNum, setAgendaNum] = useState('')
    const dispatch = useDispatch()
    const meetingArchiveStore = useSelector(state => state.meetingArchive)
    const topicsSelected = meetingArchiveStore?.topicsSelected
    const suggestions = meetingArchiveStore.meetingList
    const meeting = meetingArchiveStore.meeting
    const agendaNum = meetingArchiveStore.agendaNum
    const agendaDate = meetingArchiveStore.agendaDate
    // useLayoutEffect(() => {
    //     if (topicsSelected?.agenda_date) {
    //         setMsgDate(topicsSelected?.agenda_date)
    //     }
    // }, [topicsSelected])
    const blurHandler = e => {
        if (meeting?.id) {
            dispatch({
                type: 'SET_MEETING_ARCHIVE_LOADING'
            })
            const obj = {
                meetingTitleName: meeting?.id,
                agendaNum
            }
            dispatch(getAgendaTopics(obj))
        }
    }
    useEffect(() => {
        if (meeting?.id) {
            dispatch({
                type: 'SET_MEETING_ARCHIVE_LOADING'
            })
            const obj = {
                meetingTitleName: meeting?.id,
                agendaNum
            }
            dispatch(getAgendaTopics(obj))
        }
    }, [meeting])
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col md={4} sm={12}>
                        <FormGroup>
                            <Label for='meetingName'>اسم الاجتماع</Label>
                            <SelectSync
                                suggestions={suggestions}
                                id='meeting'
                                name='meeting'
                                selectedFromApi={meeting}
                                onSelect={(value) => {
                                    dispatch(setSelectMeeting(value))
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={2}>
                        <FormGroup>
                            <Label for='agendaNum'>رقم الجلسة</Label>
                            <InputGroup className={`input-group-merge`}>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Link2 className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    id='agendaNum'
                                    name='agendaNum'
                                    placeholder='رقم الجلسة'
                                    value={agendaNum}
                                    onChange={e => dispatch(setAgendaNum(e.target.value))}
                                    onBlur={blurHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={2}>
                        <FormGroup>
                            <Label for='default-msgDate'>تاريخ الجلسة</Label>
                            <InputGroup className='input-group-merge '>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Calendar className='headings' size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Flatpickr defaultValue={format(today)} className='form-control' value={agendaDate} onChange={date => dispatch(setAgendaDate(date))} id='default-msgDate' />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </CardBody>
        </Card>

    )
}

export default CardOne