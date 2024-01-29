import { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input,
    FormFeedback
} from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {
    Edit2,
    Calendar,
    FileText,
    Hash,
    Clock,
    Archive
} from 'react-feather'
import QuickReportIcons from '../../our-componnets/QuickReportIcons'
import AutoCompleteInput from '../../our-componnets/AutoCompleteInput'
import Flatpickr from 'react-flatpickr'
import { AbilityContext } from '@src/utility/context/Can'
import { useDispatch } from "react-redux"


function addLeadingZeros (num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1)
    const dt2 = new Date(date2)
    return Math.floor(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)
}


const format = (date) => {
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}

const citizenIconController = {
    lic: false,
    water: false,
    elec: false,
    archive: true,
    job: false,
    tasks: false
}

const FormProject = (props) => {

    const history = useHistory()
    const [model, setModel] = useState(props.modelData)
    const ability = useContext(AbilityContext)
    const dispatch = useDispatch()
    useEffect(() => {

        setModel(props.modelData)
    }, [props.modelData])
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='custom-title'>
                    <img src={'https://db.expand.ps/images/info.png'} alt='user-avatar'
                        className='img-fluid rounded' height='40' width='40' />
                    اسم المشروع
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Col sm='12'>
                    <Row>
                        <Col sm='8' md='8'>
                            <FormGroup>
                                <Label for='fullName'> اسم المشروع</Label>
                                <AutoCompleteInput apiUrl='project_auto_complete'
                                    placeholder='اسم المشروع'
                                    onSelect={(name) => {
                                        if (props.outPage) {
                                            dispatch({
                                                type: 'GET_DEF',
                                                id: +name?.id
                                            })
                                        } else {
                                            history.push(`/add&edit/show_projects/${name?.id ?? ''}`)
                                        }
                                    }}
                                    id='fullName'
                                    name='fullName'
                                    register={props.register}
                                    errors={props.errors.fullName}
                                    icon={<FileText className='headings' size={14} />}
                                />
                                <Input
                                    id='id'
                                    name='id'
                                    type='hidden'
                                    innerRef={props.register()}
                                />
                                {props.errors && props.errors.name && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='projectNo'>رقم المشروع</Label>

                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Hash size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='projectNo'
                                        name='projectNo'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.projectNo && true}
                                        placeholder='رقم المشروع'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.projectNo && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm='12'>
                    <Row>
                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='dateStart'>تاريخ بداية المشروع</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.pickerStart)} className='form-control'
                                        value={props.pickerStart}
                                        onChange={date => props.setPickerStart(date[0])} id='default-picker' />

                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='dateEnd'>تاريخ نهاية المشروع</Label>

                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Calendar size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Flatpickr defaultValue={format(props.picker1)} className='form-control'
                                        value={props.picker1}
                                        onChange={date => props.setPicker1(date[0])} id='default-picker' />
                                </InputGroup>

                            </FormGroup>
                        </Col>

                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='project_period'>مدة المشروع</Label>

                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Clock size={14} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='project_period'
                                        name='project_period'
                                        defaultValue={`${date_diff_indays(props.pickerStart, props.picker1)} يوم `}
                                        innerRef={props.register({ required: true })}

                                        invalid={props.errors.project_period && true}
                                        placeholder='مدة المشروع'
                                    />
                                </InputGroup>
                                {props.errors && props.errors.project_period &&
                                    <FormFeedback>ادخل نص صحيح</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>

                <Col sm='12'>
                    <Row>
                        <Col sm='4' md='4'>
                            <FormGroup>
                                <Label for='Projectcost'>تكلفة المشروع</Label>

                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    </InputGroupAddon>
                                    <Input
                                        id='Projectcost'
                                        name='Projectcost'
                                        placeholder='00.00'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.Projectcost && true}
                                    />
                                    <Input
                                        type='select'
                                        name='CurrencyID'
                                        id='CurrencyID'
                                        innerRef={props.register({ required: true })}
                                        invalid={props.errors.CurrencyID && true}>
                                        <option defaultValue={1}>دولار</option>
                                        <option value={2}>يورو</option>
                                        <option value={3}>شيكل</option>
                                        <option value={4}>درهم</option>
                                        <option value={5}>دينار</option>

                                    </Input>

                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={"8"} md={"8"}>
                            <FormGroup>
                                <Label for='notes'>ملاحظات</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Edit2 className='headings' size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        id='notes'
                                        name='notes'
                                        type='text'
                                        innerRef={props.register({ required: false })}
                                        invalid={props.errors.Projectcost && true}
                                        placeholder='ملاحظات'
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>


                        <Col sm={'12'} md={'12'} style={{ marginTop: '20px' }}>
                            {ability.can('read', 'project_archives') && <><Col sm={'12'} md={'12'}
                                style={{ marginTop: '20px' }}>
                                <h4>
                                    <span> <Archive /> الأرشيف </span>
                                </h4>
                                <hr />
                            </Col>

                                <QuickReportIcons type={'show_projects'} modelData={model}
                                    citizenIconController={citizenIconController}></QuickReportIcons></>}
                        </Col>
                    </Row>
                </Col>
            </CardBody>
        </Card>

    )
}


export default FormProject