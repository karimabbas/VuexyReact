import {
    CreditCard,
    Edit2,
    Hash,
    Mail,
    Calendar,
    Link2,
    FileText,
    Archive,
    Map,
    Plus,
    Smartphone,
    User
} from "react-feather"
import {useState, useEffect} from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select, {components} from 'react-select'
import makeAnimated, {ValueContainer} from "react-select/animated"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    InputGroupButtonDropdown,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    InputGroup,
    DropdownMenu,
    InputGroupAddon,
    DropdownItem,
    DropdownToggle,
    InputGroupText,
    Label,
    Input,
    FormFeedback
} from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
import api from "../../@core/util/api"

import AutoCompleteAjax from "../our-componnets/AutoCompleteAjax"
import {data} from "jquery"
import SelectWIthAddNew from "../our-componnets/SelectWIthAddNew"

const dateNow = Date.now()
const today = new Date(dateNow)

const ReportsForm = (props) => {

    const arcType = [
        {value: 'all', label: 'الكل'},
        {value: 'outArchive', label: 'أرشيف الصادر', docTypeId: 0},
        {value: 'inArchive', label: 'أرشيف الوارد', docTypeId: 0},
        {value: 'projArchive', label: 'أرشيف المشاريع', docTypeId: 53},
        {value: 'OrgArchive', label: 'أرشيف المؤسسة', docTypeId: 49},
        {value: 'assetsArchive', label: 'أرشيف الأصول', docTypeId: 9},
        {value: 'empArchive', label: 'أرشيف الموظفين', docTypeId: 50},
        {value: 'citArchive', label: 'أرشيف المواطنين', docTypeId: 52},
        {value: 'contractArchive', label: 'أرشيف الأتفاقيات والعقود', docTypeId: 51},
        {value: 'lawArchieve', label: 'أرشيف القوانين والأجراءات', docTypeId: 101},
        {value: 'financeArchive', label: 'أرشيف المالية', docTypeId: 105}

    ]

    const [doc, setDoc] = useState('')
    const [selected, setSelected] = useState("all")

    const changeSelectOptionHandler = (event) => {
        setSelected(event.value)
        setDoc(event.docTypeId)
    }

    const [customer, setCustomer] = useState({label: 'اختر من القائمة', value: ''})
    const [suggestions, setSuggestions] = useState([])

    const [picker, setPicker] = useState(today)
    const [picker1, setPicker1] = useState(today)

    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    const format = (date) => {
        return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
    }

    const date_diff_indays = function (date1, date2) {
        const dt1 = new Date(date1)
        const dt2 = new Date(date2)
        return Math.floor(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)
    }


    const {register, errors, reset, handleSubmit, setValue} = useForm({mode: 'onChange'})

    const onSubmit = data => {
        // props.onsubmit(data)
        console.log(data)
        props.onsubmit({...data, picker, picker1, selected, customer})

    }
    const resetHandler = () => {
        setPicker(today)
        setPicker1(today)

        reset(' ')
    }


    // useEffect(() => {
    //     resetHandler()

    // }, [props.isSubmitted])

    useEffect(() => {
        resetHandler()
    }, [props.type])

    useEffect(() => {
        if (props.type === 'CentralArchive') {
            api().get('archive_auto_complete').then(response => {
                setSuggestions(response.data)
            })
        }
    }, [props.type === 'CentralArchive'])


    const handelname = (name) => {
        if (name === 'CentralArchive') return 'الأرشيف المركزى'
        else if (name === 'DailyReport') return 'الأرشيف اليومى'
        else if (name === 'DeletedArchive') return 'حذف الأرشيف'
        else if (name === 'DeletedDef') return 'حذف التعريفات'

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'match-height'}>
                <Col md={"12"} sm={"12"}>

                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4' className='custom-title'>
                                <img src={'https://t.palexpand.ps/assets/images/archive_ico.png'} alt='user-avatar'
                                     style={{height: '32px', marginLeft: '5px'}}/>
                                تقرير {handelname(props.type)}
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {(props.type !== 'DeletedArchive' && props.type !== 'DeletedDef' && props.type !== 'DailyReport') &&
                                    <Col sm='3' md='3'>
                                        <FormGroup>
                                            <Label for='arcType'>نوع الأرشيف</Label>
                                            <Select type='select'
                                                    name='arcType'
                                                    id='arcType'
                                                // onChange={date => setPicker(date[0])
                                                    onChange={changeSelectOptionHandler}
                                                    options={arcType}
                                                    innerRef={register({required: true})}
                                                    invalid={errors.arcType && true}>

                                            </Select>

                                            {errors && errors.arcType && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                                        </FormGroup>
                                    </Col>}

                                {(props.type !== 'DeletedArchive' && props.type !== 'DeletedDef' && props.type !== 'CentralArchive') &&
                                    <Col sm='3' md='3'>
                                        <FormGroup>
                                            <Label for='search_type'> نوع البحث</Label>
                                            <InputGroup className='input-group-merge mb-2'>
                                                <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText>
                                                        <FileText size={14}/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type='select'
                                                       name='search_type'
                                                       id='search_type'
                                                       defaultValue={1}
                                                       innerRef={register({required: false})}>
                                                    <option value={2}>إجمالى</option>
                                                    <option value={1}>تفصيلى</option>
                                                </Input>
                                            </InputGroup>

                                            {errors && errors.report_type && <FormFeedback>ادخل نص صحيح</FormFeedback>}
                                        </FormGroup>
                                    </Col>}
                                <Col sm='3' md='3'>
                                    <FormGroup>
                                        <Label for='default-picker'>من تاريخ</Label>
                                        <InputGroup className='input-group-merge mb-2'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Calendar size={14}/>
                                                </InputGroupText>
                                            </InputGroupAddon>

                                            <Flatpickr defaultValue={format(picker)} className='form-control'
                                                       value={picker}
                                                       onChange={date => setPicker(date[0])} id='default-picker'/>
                                        </InputGroup>

                                    </FormGroup>
                                </Col>
                                <Col sm='3' md='3'>
                                    <FormGroup>
                                        <Label for='default-picker'> إلى تاريخ</Label>
                                        <InputGroup className='input-group-merge mb-2'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Calendar size={14}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Flatpickr defaultValue={format(picker1)} className='form-control'
                                                       value={picker1}
                                                       onChange={date => setPicker1(date[0])} id='default-picker'/>
                                        </InputGroup>

                                    </FormGroup>
                                </Col>
                                <Col sm='3' md='3'>
                                    <FormGroup>
                                        <Label for='default-picker'> المده</Label>
                                        <InputGroup className='input-group-merge mb-2'>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Calendar size={14}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name='period'
                                                id='period'
                                                value={`${date_diff_indays(picker, picker1)} يوم `}
                                                onChange={value => value}
                                                innerRef={register({required: true})}
                                            />

                                        </InputGroup>

                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                {(props.type !== 'DeletedArchive' && props.type !== 'DeletedDef' && props.type !== 'DailyReport') &&
                                    <Col sm='3' md='3'>
                                        <FormGroup>
                                            <Label for='customerName'> مرتبط ب </Label>
                                            <AutoCompleteAjax
                                                suggestions={suggestions}
                                                selectedFromApi={customer}
                                                onSelect={(value) => {
                                                    setCustomer(value)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>}


                                {(props.type !== 'DeletedArchive' && props.type !== 'DeletedDef' && props.type !== 'DailyReport' && selected !== 'outArchive'
                                        && selected !== 'inArchive' && selected !== 'lawArchieve' && selected !== 'financeArchive' && selected !== 'assetsArchive' && selected !== 'all') &&
                                    <Col sm='3' md='3'>
                                        <FormGroup>
                                            <Label for='doc'> النوع</Label>
                                            <Input
                                                id='doc'
                                                name='doc'
                                                type='hidden'
                                                innerRef={register({required: false})}
                                            />
                                            <div className='invoice-customer'>
                                                <SelectWIthAddNew apiUrl={``}
                                                                  id={'docType'}
                                                                  name={'docType'}
                                                                  title={'نوع الأرشيف'}
                                                                  modelId={doc}
                                                                  hasAddNew={false}
                                                                  hasSelectAllOption={true}
                                                                  storeUrl={''}
                                                                  deleteUrl={''}
                                                                  // deptDefult={regionSetter}
                                                                  onSelect={(value) => {
                                                                      setValue('doc', value.id)
                                                                  }}/>

                                            </div>
                                            {/*<Select*/}
                                            {/*    name='orgType'*/}
                                            {/*    id='orgType'*/}
                                            {/*    options={type}*/}
                                            {/*    onChange={(e) => {*/}
                                            {/*        setDoc(e.value)*/}
                                            {/*    }}*/}

                                            {/*    innerRef={register({ required: false })}>*/}

                                            {/*</Select>*/}

                                            {/*{errors && errors.archive_type && <FormFeedback>ادخل نص صحيح</FormFeedback>}*/}
                                        </FormGroup>
                                    </Col>}

                            </Row>


                            <Col md={'12'} sm={"12"}>
                                <center>
                                    <Button.Ripple className='mr-1' color='primary' type='submit'>
                                        بحث

                                    </Button.Ripple>
                                </center>
                            </Col>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}
export default ReportsForm